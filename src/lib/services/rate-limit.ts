// src/lib/services/rate-limit.ts
import { MongoClient } from 'mongodb';


export class RateLimitService {
  private static client: MongoClient;
  private static db: any;

  // Rate limit configurations
  private static limits = {
    password_reset: {
      maxAttempts: 3,
      windowMinutes: 15,
      blockDurationMinutes: 60,
    },
    login_failed: {
      maxAttempts: 5,
      windowMinutes: 15,
      blockDurationMinutes: 30,
    },
    email_verification: {
      maxAttempts: 5,
      windowMinutes: 60,
      blockDurationMinutes: 120,
    },
  };

  static async initialize(mongoUri: string) {
    if (!this.client) {
      this.client = new MongoClient(mongoUri);
      await this.client.connect();
      this.db = this.client.db();
      
      // Create index for efficient queries
      await this.db.collection('RateLimit').createIndex(
        { identifier: 1, action: 1 },
        { unique: true }
      );
      
      // Create TTL index to auto-delete old entries
      await this.db.collection('RateLimit').createIndex(
        { lastAttempt: 1 },
        { expireAfterSeconds: 86400 } // 24 hours
      );
    }
  }

  static async checkLimit(
    identifier: string,
    action: keyof typeof RateLimitService.limits
  ): Promise<{ allowed: boolean; retryAfter?: number }> {
    const config = this.limits[action];
    if (!config) {
      return { allowed: true };
    }

    const now = new Date();
    const windowStart = new Date(now.getTime() - config.windowMinutes * 60 * 1000);

    // Get or create rate limit entry
    const entry = await this.db.collection('RateLimit').findOne({
      identifier,
      action,
    });

    // Check if currently blocked
    if (entry?.blockedUntil && entry.blockedUntil > now) {
      const retryAfter = Math.ceil((entry.blockedUntil.getTime() - now.getTime()) / 1000);
      return { allowed: false, retryAfter };
    }

    // Reset attempts if outside window
    if (entry && entry.lastAttempt < windowStart) {
      await this.db.collection('RateLimit').updateOne(
        { identifier, action },
        { 
          $set: { 
            attempts: 0,
            lastAttempt: now,
            blockedUntil: null
          } 
        }
      );
      return { allowed: true };
    }

    // Check attempts within window
    const attempts = entry?.attempts || 0;
    if (attempts >= config.maxAttempts) {
      // Block the user
      const blockedUntil = new Date(now.getTime() + config.blockDurationMinutes * 60 * 1000);
      await this.db.collection('RateLimit').updateOne(
        { identifier, action },
        { 
          $set: { blockedUntil },
          $setOnInsert: { identifier, action }
        },
        { upsert: true }
      );
      
      const retryAfter = config.blockDurationMinutes * 60;
      return { allowed: false, retryAfter };
    }

    return { allowed: true };
  }

  static async recordAttempt(
    identifier: string,
    action: keyof typeof RateLimitService.limits
  ): Promise<void> {
    const now = new Date();
    
    await this.db.collection('RateLimit').updateOne(
      { identifier, action },
      { 
        $inc: { attempts: 1 },
        $set: { lastAttempt: now },
        $setOnInsert: { identifier, action }
      },
      { upsert: true }
    );
  }

  static async reset(
    identifier: string,
    action?: keyof typeof RateLimitService.limits
  ): Promise<void> {
    if (action) {
      await this.db.collection('RateLimit').deleteOne({ identifier, action });
    } else {
      await this.db.collection('RateLimit').deleteMany({ identifier });
    }
  }

  static async cleanup(): Promise<void> {
    const now = new Date();
    // Remove expired blocks
    await this.db.collection('RateLimit').deleteMany({
      blockedUntil: { $lt: now }
    });
  }
}

export const rateLimitService = RateLimitService;