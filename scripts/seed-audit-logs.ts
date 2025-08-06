// scripts/seed-audit-logs.ts
import { MongoClient } from 'mongodb';

const ADMIN_USER_ID = '688dc486a823dd5e2720760b';

// Audit log action types
const ACTION_TYPES = [
  'login',
  'logout',
  'password_change',
  'profile_update',
  'role_change',
  'settings_update',
  'user_created',
  'user_updated',
  'user_deleted',
  'post_created',
  'post_updated',
  'post_deleted',
  'comment_created',
  'comment_deleted',
  'api_access',
  'data_export',
  'permission_granted',
  'permission_revoked',
];

// Generate random IP addresses
const generateIP = () => {
  const octets = [];
  for (let i = 0; i < 4; i++) {
    octets.push(Math.floor(Math.random() * 256));
  }
  return octets.join('.');
};

// Generate random user agents
const USER_AGENTS = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0'
];

// Helper functions
const randomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const randomElements = <T>(array: T[], min: number, max: number): T[] => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const result: T[] = [];
  const availableItems = [...array];
  
  for (let i = 0; i < count && availableItems.length > 0; i++) {
    const index = Math.floor(Math.random() * availableItems.length);
    result.push(availableItems[index]);
    availableItems.splice(index, 1);
  }
  
  return result;
};

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const generateEmail = () => {
  const names = ['john', 'jane', 'bob', 'alice', 'charlie', 'david', 'emma', 'frank'];
  const domains = ['example.com', 'test.com', 'demo.org', 'sample.net'];
  return `${randomElement(names)}${Math.floor(Math.random() * 1000)}@${randomElement(domains)}`;
};

const generateSentence = () => {
  const subjects = ['The user', 'The admin', 'The system', 'The application'];
  const verbs = ['updated', 'created', 'modified', 'deleted', 'accessed', 'changed'];
  const objects = ['the settings', 'a post', 'the profile', 'a comment', 'the configuration'];
  return `${randomElement(subjects)} ${randomElement(verbs)} ${randomElement(objects)}.`;
};

async function seedAuditLogs() {
  const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL || "mongodb://localhost:27017/geenius-template";
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    const auditLogCollection = db.collection('AuditLog');
    
    // Check existing count
    const existingCount = await auditLogCollection.countDocuments({ userId: ADMIN_USER_ID });
    console.log(`Found ${existingCount} existing audit logs for admin user`);
    
    // Generate audit logs for the past 30 days
    const logs = [];
    const now = new Date();
    
    for (let i = 0; i < 150; i++) {
      // Spread logs over the past 30 days
      const daysAgo = Math.floor(Math.random() * 30);
      const hoursAgo = Math.floor(Math.random() * 24);
      const minutesAgo = Math.floor(Math.random() * 60);
      
      const createdAt = new Date(now);
      createdAt.setDate(createdAt.getDate() - daysAgo);
      createdAt.setHours(createdAt.getHours() - hoursAgo);
      createdAt.setMinutes(createdAt.getMinutes() - minutesAgo);
      
      const action = randomElement(ACTION_TYPES);
      const success = Math.random() > 0.05; // 95% success rate
      
      const log = {
        userId: ADMIN_USER_ID,
        action,
        details: generateDetails(action),
        ip: generateIP(),
        userAgent: randomElement(USER_AGENTS),
        success,
        error: success ? null : randomElement([
          'Authentication failed',
          'Permission denied',
          'Resource not found',
          'Invalid request',
          'Rate limit exceeded'
        ]),
        createdAt
      };
      
      logs.push(log);
    }
    
    // Sort by date (newest first)
    logs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    // Insert the logs
    const result = await auditLogCollection.insertMany(logs);
    console.log(`Inserted ${result.insertedCount} audit log entries`);
    
    // Show sample of what was inserted
    console.log('\nSample audit logs:');
    const samples = await auditLogCollection
      .find({ userId: ADMIN_USER_ID })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();
    
    samples.forEach(log => {
      console.log(`- ${log.action} at ${log.createdAt.toISOString()} from ${log.ip}`);
    });
    
    console.log('\nAudit log seeding completed successfully!');
    
  } catch (error) {
    console.error('Error seeding audit logs:', error);
  } finally {
    await client.close();
  }
}

function generateDetails(action: string) {
  switch (action) {
    case 'login':
      return { method: randomElement(['password', 'oauth', 'magic_link']) };
    
    case 'logout':
      return { sessionDuration: Math.floor(Math.random() * (7200 - 60) + 60) };
    
    case 'password_change':
      return { method: randomElement(['user_initiated', 'admin_reset', 'forgot_password']) };
    
    case 'profile_update':
      return { 
        fields: randomElements(['name', 'email', 'avatar', 'bio', 'timezone'], 1, 3)
      };
    
    case 'role_change':
      return { 
        from: randomElement(['user', 'moderator']),
        to: randomElement(['admin', 'moderator', 'user'])
      };
    
    case 'settings_update':
      return { 
        setting: randomElement(['theme', 'notifications', 'privacy', 'language']),
        value: randomElement(['enabled', 'disabled', 'dark', 'light', 'en', 'es', 'fr'])
      };
    
    case 'user_created':
    case 'user_updated':
    case 'user_deleted':
      return { 
        targetUserId: generateUUID(),
        targetEmail: generateEmail()
      };
    
    case 'post_created':
    case 'post_updated':
    case 'post_deleted':
      return { 
        postId: generateUUID(),
        title: generateSentence()
      };
    
    case 'comment_created':
    case 'comment_deleted':
      return { 
        commentId: generateUUID(),
        postId: generateUUID()
      };
    
    case 'api_access':
      return { 
        endpoint: randomElement(['/api/users', '/api/posts', '/api/admin/stats', '/api/settings']),
        method: randomElement(['GET', 'POST', 'PUT', 'DELETE'])
      };
    
    case 'data_export':
      return { 
        type: randomElement(['users', 'posts', 'audit_logs', 'full_backup']),
        format: randomElement(['json', 'csv', 'xlsx'])
      };
    
    case 'permission_granted':
    case 'permission_revoked':
      return { 
        permission: randomElement(['admin_access', 'moderator_access', 'api_access', 'export_data']),
        targetUserId: generateUUID()
      };
    
    default:
      return {};
  }
}

// Run the seeder
seedAuditLogs().catch(console.error);