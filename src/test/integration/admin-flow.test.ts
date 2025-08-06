import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MongoClient } from 'mongodb';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/lib/auth';

// Mock environment variables
process.env.DATABASE_URL = 'mongodb://localhost:27017/test';
process.env.BETTER_AUTH_SECRET = 'test-secret';

describe('Admin Flow Integration Tests', () => {
  let mongoClient: MongoClient;
  let prisma: PrismaClient;
  let adminToken: string;
  let adminUserId: string;
  let regularUserToken: string;
  let regularUserId: string;

  beforeEach(async () => {
    // Setup test database connections
    mongoClient = new MongoClient(process.env.DATABASE_URL!);
    await mongoClient.connect();
    
    prisma = new PrismaClient();
    
    // Clear test data
    await mongoClient.db().collection('user').deleteMany({});
    await mongoClient.db().collection('session').deleteMany({});
    await prisma.auditLog.deleteMany({});
    await prisma.userPreference.deleteMany({});

    // Create admin user
    const adminSignupRequest = new Request('http://localhost/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: 'AdminPass123!',
        name: 'Admin User',
      }),
    });
    const adminSignupResponse = await auth.handler(adminSignupRequest);
    const adminSignupResult = await adminSignupResponse.json();
    adminUserId = adminSignupResult.user.id;

    // Assign admin role
    await prisma.userPreference.create({
      data: {
        userId: adminUserId,
        role: 'admin',
      },
    });

    // Login as admin
    const adminLoginRequest = new Request('http://localhost/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: 'AdminPass123!',
      }),
    });
    const adminLoginResponse = await auth.handler(adminLoginRequest);
    const adminLoginResult = await adminLoginResponse.json();
    adminToken = adminLoginResult.session.token;

    // Create regular user
    const userSignupRequest = new Request('http://localhost/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'user@example.com',
        password: 'UserPass123!',
        name: 'Regular User',
      }),
    });
    const userSignupResponse = await auth.handler(userSignupRequest);
    const userSignupResult = await userSignupResponse.json();
    regularUserId = userSignupResult.user.id;

    // Create user role entry
    await prisma.userPreference.create({
      data: {
        userId: regularUserId,
        role: 'user',
      },
    });

    // Login as regular user
    const userLoginRequest = new Request('http://localhost/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'user@example.com',
        password: 'UserPass123!',
      }),
    });
    const userLoginResponse = await auth.handler(userLoginRequest);
    const userLoginResult = await userLoginResponse.json();
    regularUserToken = userLoginResult.session.token;
  });

  afterEach(async () => {
    await mongoClient.close();
    await prisma.$disconnect();
  });

  describe('User Management', () => {
    it('should allow admin to list all users', async () => {
      const request = new Request('http://localhost/api/admin-users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      });

      const response = await fetch(request);
      expect(response.status).toBe(200);

      const users = await response.json();
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBe(2);
    });

    it('should deny regular user from listing all users', async () => {
      const request = new Request('http://localhost/api/admin-users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${regularUserToken}`,
        },
      });

      const response = await fetch(request);
      expect(response.status).toBe(403);
    });

    it('should allow admin to view user details', async () => {
      const request = new Request(`http://localhost/api/admin-users/${regularUserId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      });

      const response = await fetch(request);
      expect(response.status).toBe(200);

      const userDetails = await response.json();
      expect(userDetails.user.id).toBe(regularUserId);
      expect(userDetails.user.email).toBe('user@example.com');
      expect(userDetails.role).toBe('user');
    });

    it('should allow admin to update user role', async () => {
      const request = new Request(`http://localhost/api/admin-users/${regularUserId}/role`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: 'admin' }),
      });

      const response = await fetch(request);
      expect(response.status).toBe(200);

      // Verify role update
      const userPreference = await prisma.userPreference.findUnique({
        where: { userId: regularUserId },
      });
      expect(userPreference?.role).toBe('admin');

      // Verify audit log
      const auditLogs = await prisma.auditLog.findMany({
        where: {
          userId: adminUserId,
          action: 'role_updated',
        },
      });
      expect(auditLogs).toHaveLength(1);
      expect(auditLogs[0].details).toMatchObject({
        targetUserId: regularUserId,
        newRole: 'admin',
        oldRole: 'user',
      });
    });

    it('should allow admin to delete user', async () => {
      const request = new Request(`http://localhost/api/admin-users/${regularUserId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      });

      const response = await fetch(request);
      expect(response.status).toBe(200);

      // Verify user is deleted
      const user = await mongoClient.db().collection('user').findOne({
        id: regularUserId,
      });
      expect(user).toBeNull();

      // Verify audit log
      const auditLogs = await prisma.auditLog.findMany({
        where: {
          userId: adminUserId,
          action: 'user_deleted',
        },
      });
      expect(auditLogs).toHaveLength(1);
    });
  });

  describe('Admin Dashboard Statistics', () => {
    beforeEach(async () => {
      // Create additional test data
      for (let i = 0; i < 5; i++) {
        const signupRequest = new Request('http://localhost/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: `testuser${i}@example.com`,
            password: 'TestPass123!',
            name: `Test User ${i}`,
          }),
        });
        await auth.handler(signupRequest);
      }

      // Create some audit logs
      await prisma.auditLog.createMany({
        data: [
          { userId: adminUserId, action: 'login', success: true },
          { userId: adminUserId, action: 'login', success: true },
          { userId: regularUserId, action: 'login', success: true },
          { userId: regularUserId, action: 'login_failed', success: false },
        ],
      });
    });

    it('should return correct dashboard statistics', async () => {
      const request = new Request('http://localhost/api/admin-stats', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      });

      const response = await fetch(request);
      expect(response.status).toBe(200);

      const stats = await response.json();
      expect(stats.totalUsers).toBe(7); // 2 initial + 5 additional
      expect(stats.activeUsers).toBeGreaterThan(0);
      expect(stats.totalSessions).toBeGreaterThan(0);
      expect(stats.recentActivity).toBeDefined();
    });
  });

  describe('Admin Audit Logs', () => {
    it('should allow admin to view all audit logs', async () => {
      // Create various audit logs
      await prisma.auditLog.createMany({
        data: [
          { userId: adminUserId, action: 'login', success: true },
          { userId: regularUserId, action: 'login', success: true },
          { userId: regularUserId, action: 'profile_updated', success: true },
        ],
      });

      const request = new Request('http://localhost/api/admin-audit-logs', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      });

      const response = await fetch(request);
      expect(response.status).toBe(200);

      const result = await response.json();
      expect(result.logs).toHaveLength(3);
      expect(result.total).toBe(3);
    });

    it('should filter audit logs by user', async () => {
      await prisma.auditLog.createMany({
        data: [
          { userId: adminUserId, action: 'login', success: true },
          { userId: regularUserId, action: 'login', success: true },
          { userId: regularUserId, action: 'logout', success: true },
        ],
      });

      const request = new Request(`http://localhost/api/admin-audit-logs?userId=${regularUserId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      });

      const response = await fetch(request);
      expect(response.status).toBe(200);

      const result = await response.json();
      expect(result.logs).toHaveLength(2);
      expect(result.logs.every((log: any) => log.userId === regularUserId)).toBe(true);
    });
  });

  describe('Session Management by Admin', () => {
    it('should allow admin to view all active sessions', async () => {
      const request = new Request('http://localhost/api/admin/sessions', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      });

      const response = await fetch(request);
      expect(response.status).toBe(200);

      const sessions = await response.json();
      expect(Array.isArray(sessions)).toBe(true);
      expect(sessions.length).toBeGreaterThan(0);
    });

    it('should allow admin to revoke user session', async () => {
      // Get regular user's session
      const sessions = await mongoClient.db().collection('session').find({
        userId: regularUserId,
      }).toArray();
      
      const sessionId = sessions[0].id;

      const request = new Request(`http://localhost/api/admin/sessions/${sessionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      });

      const response = await fetch(request);
      expect(response.status).toBe(200);

      // Verify session is revoked
      const session = await mongoClient.db().collection('session').findOne({
        id: sessionId,
      });
      expect(session).toBeNull();

      // Verify audit log
      const auditLogs = await prisma.auditLog.findMany({
        where: {
          userId: adminUserId,
          action: 'admin_session_revoked',
        },
      });
      expect(auditLogs).toHaveLength(1);
    });
  });

  describe('Admin Security Features', () => {
    it('should detect and log suspicious admin activity', async () => {
      // Simulate rapid role changes (suspicious activity)
      for (let i = 0; i < 5; i++) {
        const request = new Request(`http://localhost/api/admin-users/${regularUserId}/role`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role: i % 2 === 0 ? 'admin' : 'user' }),
        });
        await fetch(request);
      }

      // Check for security alert audit logs
      const securityLogs = await prisma.auditLog.findMany({
        where: {
          action: 'security_alert',
        },
      });

      expect(securityLogs.length).toBeGreaterThan(0);
    });

    it('should enforce permission hierarchy', async () => {
      // Admin should not be able to modify super admin
      const superAdminId = 'super-admin-id';
      
      // Create super admin role
      await prisma.userPreference.create({
        data: {
          userId: superAdminId,
          role: 'super_admin',
        },
      });

      const request = new Request(`http://localhost/api/admin-users/${superAdminId}/role`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: 'user' }),
      });

      const response = await fetch(request);
      expect(response.status).toBe(403);
    });
  });
});