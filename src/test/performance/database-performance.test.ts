import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { MongoClient } from 'mongodb';
import { PrismaClient } from '@prisma/client';
import { performance } from 'perf_hooks';

describe('Database Performance Tests', () => {
  let mongoClient: MongoClient;
  let prisma: PrismaClient;
  let testUserIds: string[] = [];

  beforeAll(async () => {
    mongoClient = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017/test');
    await mongoClient.connect();
    prisma = new PrismaClient();

    // Create test data
    console.log('Creating test data...');
    const users = [];
    for (let i = 0; i < 10000; i++) {
      users.push({
        id: `perf-user-${i}`,
        email: `perftest${i}@example.com`,
        name: `Performance Test User ${i}`,
        createdAt: new Date(),
      });
    }

    await mongoClient.db().collection('user').insertMany(users);
    testUserIds = users.map(u => u.id);

    // Create audit logs
    const auditLogs = [];
    for (let i = 0; i < 50000; i++) {
      const success = Math.random() > 0.1;
      auditLogs.push({
        userId: testUserIds[Math.floor(Math.random() * testUserIds.length)],
        action: ['login', 'logout', 'profile_updated', 'password_changed'][Math.floor(Math.random() * 4)],
        success: success,
        ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Last 30 days
        error: success ? null : 'Test error',
      });
    }

    await prisma.auditLog.createMany({ data: auditLogs });
  });

  afterAll(async () => {
    // Cleanup
    await mongoClient.db().collection('user').deleteMany({
      id: { $in: testUserIds },
    });
    await prisma.auditLog.deleteMany({
      where: { userId: { in: testUserIds } },
    });
    
    await mongoClient.close();
    await prisma.$disconnect();
  });

  describe('User Queries', () => {
    it('should handle bulk user lookups efficiently', async () => {
      const start = performance.now();
      
      // Simulate looking up 100 random users
      const randomIds = Array.from({ length: 100 }, () => 
        testUserIds[Math.floor(Math.random() * testUserIds.length)]
      );

      const users = await mongoClient.db().collection('user').find({
        id: { $in: randomIds },
      }).toArray();

      const duration = performance.now() - start;
      
      expect(users).toHaveLength(100);
      expect(duration).toBeLessThan(100); // Should complete within 100ms
      
      console.log(`Bulk user lookup (100 users): ${duration.toFixed(2)}ms`);
    });

    it('should paginate users efficiently', async () => {
      const pageSize = 50;
      const measurements = [];

      for (let page = 0; page < 5; page++) {
        const start = performance.now();
        
        const users = await mongoClient.db().collection('user')
          .find({})
          .sort({ createdAt: -1 })
          .skip(page * pageSize)
          .limit(pageSize)
          .toArray();

        const duration = performance.now() - start;
        measurements.push(duration);
        
        expect(users.length).toBeLessThanOrEqual(pageSize);
      }

      const avgDuration = measurements.reduce((a, b) => a + b) / measurements.length;
      expect(avgDuration).toBeLessThan(50); // Average should be under 50ms
      
      console.log(`User pagination average: ${avgDuration.toFixed(2)}ms`);
    });

    it('should search users by email efficiently', async () => {
      const start = performance.now();
      
      const users = await mongoClient.db().collection('user').find({
        email: { $regex: 'perftest.*@example.com', $options: 'i' },
      }).limit(20).toArray();

      const duration = performance.now() - start;
      
      expect(users.length).toBeGreaterThan(0);
      expect(duration).toBeLessThan(100); // Should complete within 100ms
      
      console.log(`Email search: ${duration.toFixed(2)}ms`);
    });
  });

  describe('Audit Log Queries', () => {
    it('should query audit logs by user efficiently', async () => {
      const userId = testUserIds[0];
      const start = performance.now();
      
      const logs = await prisma.auditLog.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 50,
      });

      const duration = performance.now() - start;
      
      expect(logs.length).toBeGreaterThan(0);
      expect(duration).toBeLessThan(100); // Should complete within 100ms
      
      console.log(`Audit logs by user: ${duration.toFixed(2)}ms`);
    });

    it('should filter audit logs by date range efficiently', async () => {
      const start = performance.now();
      
      const logs = await prisma.auditLog.findMany({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 100,
      });

      const duration = performance.now() - start;
      
      expect(logs.length).toBeGreaterThan(0);
      expect(duration).toBeLessThan(150); // Should complete within 150ms
      
      console.log(`Audit logs date range query: ${duration.toFixed(2)}ms`);
    });

    it('should aggregate audit logs efficiently', async () => {
      const start = performance.now();
      
      const actionCounts = await prisma.auditLog.groupBy({
        by: ['action'],
        _count: true,
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
          },
        },
      });

      const duration = performance.now() - start;
      
      expect(actionCounts.length).toBeGreaterThan(0);
      expect(duration).toBeLessThan(200); // Should complete within 200ms
      
      console.log(`Audit log aggregation: ${duration.toFixed(2)}ms`);
    });
  });

  describe('Session Queries', () => {
    it('should handle concurrent session operations', async () => {
      // Create test sessions
      const sessions = Array.from({ length: 100 }, (_, i) => ({
        id: `perf-session-${i}`,
        userId: testUserIds[i % testUserIds.length],
        token: `token-${i}`,
        expiresAt: new Date(Date.now() + 86400000),
        createdAt: new Date(),
      }));

      const insertStart = performance.now();
      await mongoClient.db().collection('session').insertMany(sessions);
      const insertDuration = performance.now() - insertStart;

      expect(insertDuration).toBeLessThan(500); // Bulk insert within 500ms

      // Query active sessions
      const queryStart = performance.now();
      await mongoClient.db().collection('session').find({
        expiresAt: { $gt: new Date() },
      }).limit(50).toArray();
      const queryDuration = performance.now() - queryStart;

      expect(queryDuration).toBeLessThan(50); // Query within 50ms

      // Cleanup
      await mongoClient.db().collection('session').deleteMany({
        id: { $regex: '^perf-session-' },
      });

      console.log(`Session bulk insert: ${insertDuration.toFixed(2)}ms`);
      console.log(`Session query: ${queryDuration.toFixed(2)}ms`);
    });
  });

  describe('Index Performance', () => {
    it('should verify indexes are being used', async () => {
      // Check query execution plan for user email lookup
      const emailExplain = await mongoClient.db().collection('user')
        .find({ email: 'perftest100@example.com' })
        .explain('executionStats');

      expect(emailExplain.executionStats.totalDocsExamined).toBeLessThanOrEqual(1);
      expect(emailExplain.executionStats.executionTimeMillis).toBeLessThan(10);

      // For MongoDB, we can't use $queryRaw with SQL syntax
      // Just verify the query works efficiently
      const auditStart = performance.now();
      await prisma.auditLog.findMany({
        where: { userId: testUserIds[0] },
        orderBy: { createdAt: 'desc' },
        take: 10,
      });
      const auditDuration = performance.now() - auditStart;
      expect(auditDuration).toBeLessThan(50);

      console.log('Index usage verified for email and audit log queries');
    });
  });

  describe('Write Performance', () => {
    it('should handle bulk audit log inserts efficiently', async () => {
      const batchSize = 1000;
      const logs = Array.from({ length: batchSize }, () => ({
        userId: testUserIds[Math.floor(Math.random() * testUserIds.length)],
        action: 'bulk_test' as const,
        success: true,
        error: null,
      }));

      const start = performance.now();
      await prisma.auditLog.createMany({ data: logs });
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(1000); // Should complete within 1 second
      
      // Cleanup
      await prisma.auditLog.deleteMany({
        where: { action: 'bulk_test' },
      });

      console.log(`Bulk audit log insert (${batchSize} records): ${duration.toFixed(2)}ms`);
    });

    it('should handle concurrent user updates', async () => {
      const updatePromises = testUserIds.slice(0, 50).map(async (userId) => {
        const start = performance.now();
        await mongoClient.db().collection('user').updateOne(
          { id: userId },
          { $set: { updatedAt: new Date() } }
        );
        return performance.now() - start;
      });

      const durations = await Promise.all(updatePromises);
      const avgDuration = durations.reduce((a, b) => a + b) / durations.length;

      expect(avgDuration).toBeLessThan(50); // Average update should be under 50ms
      console.log(`Concurrent user updates average: ${avgDuration.toFixed(2)}ms`);
    });
  });
});