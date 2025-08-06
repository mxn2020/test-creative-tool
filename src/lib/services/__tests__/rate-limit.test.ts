import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RateLimitService } from '../rate-limit';

// Mock MongoDB
const mockDb = {
  collection: vi.fn(() => ({
    findOne: vi.fn(),
    updateOne: vi.fn(),
    deleteOne: vi.fn(),
    deleteMany: vi.fn(),
    createIndex: vi.fn(),
  })),
};

const mockClient = {
  connect: vi.fn(),
  db: vi.fn(() => mockDb),
};

vi.mock('mongodb', () => ({
  MongoClient: vi.fn(() => mockClient),
}));

describe('RateLimitService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('checkLimit', () => {
    it('should allow request when no previous attempts', async () => {
      const collection = mockDb.collection();
      (collection.findOne as any).mockResolvedValueOnce(null);

      const result = await RateLimitService.checkLimit('test@example.com', 'password_reset');
      
      expect(result).toEqual({ allowed: true });
    });

    it('should block when currently blocked', async () => {
      const futureDate = new Date(Date.now() + 3600000); // 1 hour from now
      const collection = mockDb.collection();
      (collection.findOne as any).mockResolvedValueOnce({
        blockedUntil: futureDate,
      });

      const result = await RateLimitService.checkLimit('test@example.com', 'password_reset');
      
      expect(result.allowed).toBe(false);
      expect(result.retryAfter).toBeGreaterThan(0);
    });

    it('should reset attempts when outside window', async () => {
      const oldDate = new Date(Date.now() - 3600000); // 1 hour ago
      const collection = mockDb.collection();
      (collection.findOne as any).mockResolvedValueOnce({
        lastAttempt: oldDate,
        attempts: 5,
      });

      const result = await RateLimitService.checkLimit('test@example.com', 'password_reset');
      
      expect(result).toEqual({ allowed: true });
      expect(collection.updateOne).toHaveBeenCalledWith(
        { identifier: 'test@example.com', action: 'password_reset' },
        expect.objectContaining({
          $set: expect.objectContaining({
            attempts: 0,
            blockedUntil: null,
          }),
        })
      );
    });

    it('should block when max attempts reached', async () => {
      const collection = mockDb.collection();
      (collection.findOne as any).mockResolvedValueOnce({
        attempts: 3,
        lastAttempt: new Date(),
      });

      const result = await RateLimitService.checkLimit('test@example.com', 'password_reset');
      
      expect(result.allowed).toBe(false);
      expect(result.retryAfter).toBe(3600); // 60 minutes
      expect(collection.updateOne).toHaveBeenCalledWith(
        { identifier: 'test@example.com', action: 'password_reset' },
        expect.objectContaining({
          $set: expect.objectContaining({
            blockedUntil: expect.any(Date),
          }),
        }),
        { upsert: true }
      );
    });
  });

  describe('recordAttempt', () => {
    it('should increment attempt counter', async () => {
      const collection = mockDb.collection();

      await RateLimitService.recordAttempt('test@example.com', 'login_failed');

      expect(collection.updateOne).toHaveBeenCalledWith(
        { identifier: 'test@example.com', action: 'login_failed' },
        expect.objectContaining({
          $inc: { attempts: 1 },
          $set: { lastAttempt: expect.any(Date) },
        }),
        { upsert: true }
      );
    });
  });

  describe('reset', () => {
    it('should reset specific action for identifier', async () => {
      const collection = mockDb.collection();

      await RateLimitService.reset('test@example.com', 'password_reset');

      expect(collection.deleteOne).toHaveBeenCalledWith({
        identifier: 'test@example.com',
        action: 'password_reset',
      });
    });

    it('should reset all actions for identifier', async () => {
      const collection = mockDb.collection();

      await RateLimitService.reset('test@example.com');

      expect(collection.deleteMany).toHaveBeenCalledWith({
        identifier: 'test@example.com',
      });
    });
  });

  describe('cleanup', () => {
    it('should remove expired blocks', async () => {
      const collection = mockDb.collection();

      await RateLimitService.cleanup();

      expect(collection.deleteMany).toHaveBeenCalledWith({
        blockedUntil: { $lt: expect.any(Date) },
      });
    });
  });
});