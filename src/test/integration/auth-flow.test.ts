import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MongoClient } from 'mongodb';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/lib/auth';
import { RateLimitService } from '@/lib/services/rate-limit';

// Mock environment variables
process.env.DATABASE_URL = 'mongodb://localhost:27017/test';
process.env.BETTER_AUTH_SECRET = 'test-secret';

describe('Authentication Flow Integration Tests', () => {
  let mongoClient: MongoClient;
  let prisma: PrismaClient;

  beforeEach(async () => {
    // Setup test database connections
    mongoClient = new MongoClient(process.env.DATABASE_URL!);
    await mongoClient.connect();
    
    prisma = new PrismaClient();
    
    // Clear test data
    await mongoClient.db().collection('user').deleteMany({});
    await mongoClient.db().collection('session').deleteMany({});
    await mongoClient.db().collection('ratelimits').deleteMany({});
    await prisma.auditLog.deleteMany({});
  });

  afterEach(async () => {
    await mongoClient.close();
    await prisma.$disconnect();
  });

  describe('User Registration Flow', () => {
    it('should register a new user and create audit log', async () => {
      const testUser = {
        email: 'newuser@example.com',
        password: 'SecurePass123!',
        name: 'New User',
      };

      // Create mock request
      const mockRequest = new Request('http://localhost/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '192.168.1.100',
          'user-agent': 'Mozilla/5.0',
        },
        body: JSON.stringify(testUser),
      });

      // Register user
      const response = await auth.handler(mockRequest);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.user).toBeDefined();
      expect(result.user.email).toBe(testUser.email);

      // Verify user in database
      const dbUser = await mongoClient.db().collection('user').findOne({
        email: testUser.email,
      });
      expect(dbUser).toBeDefined();
      expect(dbUser!.name).toBe(testUser.name);

      // Verify audit log
      const auditLogs = await prisma.auditLog.findMany({
        where: { userId: result.user.id },
      });
      expect(auditLogs).toHaveLength(1);
      expect(auditLogs[0].action).toBe('signup');
      expect(auditLogs[0].success).toBe(true);
    });

    it('should prevent duplicate registrations', async () => {
      const testUser = {
        email: 'duplicate@example.com',
        password: 'SecurePass123!',
        name: 'Duplicate User',
      };

      // First registration
      const firstRequest = new Request('http://localhost/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testUser),
      });
      await auth.handler(firstRequest);

      // Attempt duplicate registration
      const secondRequest = new Request('http://localhost/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testUser),
      });
      const response = await auth.handler(secondRequest);

      expect(response.status).toBe(400);
      const result = await response.json();
      expect(result.error).toBeDefined();
    });
  });

  describe('Login Flow', () => {
    beforeEach(async () => {
      // Create test user
      const signupRequest = new Request('http://localhost/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'testuser@example.com',
          password: 'TestPass123!',
          name: 'Test User',
        }),
      });
      await auth.handler(signupRequest);
    });

    it('should login with valid credentials', async () => {
      const loginRequest = new Request('http://localhost/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '192.168.1.100',
        },
        body: JSON.stringify({
          email: 'testuser@example.com',
          password: 'TestPass123!',
        }),
      });

      const response = await auth.handler(loginRequest);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.user).toBeDefined();
      expect(result.session).toBeDefined();

      // Verify session in database
      const session = await mongoClient.db().collection('session').findOne({
        userId: result.user.id,
      });
      expect(session).toBeDefined();

      // Verify audit log
      const auditLogs = await prisma.auditLog.findMany({
        where: {
          userId: result.user.id,
          action: 'login',
        },
      });
      expect(auditLogs).toHaveLength(1);
      expect(auditLogs[0].success).toBe(true);
    });

    it('should fail login with invalid password', async () => {
      const loginRequest = new Request('http://localhost/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'testuser@example.com',
          password: 'WrongPassword',
        }),
      });

      const response = await auth.handler(loginRequest);
      
      expect(response.status).toBe(400);
      
      // Verify failed login audit log
      const user = await mongoClient.db().collection('user').findOne({
        email: 'testuser@example.com',
      });
      
      const auditLogs = await prisma.auditLog.findMany({
        where: {
          userId: user!.id,
          action: 'login_failed',
        },
      });
      expect(auditLogs).toHaveLength(1);
    });

    it('should apply rate limiting after failed attempts', async () => {
      const email = 'testuser@example.com';
      
      // Make multiple failed login attempts
      for (let i = 0; i < 5; i++) {
        const loginRequest = new Request('http://localhost/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password: 'WrongPassword',
          }),
        });
        await auth.handler(loginRequest);
      }

      // Check rate limit
      const limitCheck = await RateLimitService.checkLimit(email, 'login_failed');
      expect(limitCheck.allowed).toBe(false);
      expect(limitCheck.retryAfter).toBeGreaterThan(0);
    });
  });

  describe('Session Management', () => {
    let userId: string;
    let sessionToken: string;

    beforeEach(async () => {
      // Create and login user
      const signupRequest = new Request('http://localhost/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'sessiontest@example.com',
          password: 'TestPass123!',
          name: 'Session Test',
        }),
      });
      const signupResponse = await auth.handler(signupRequest);
      const signupResult = await signupResponse.json();
      userId = signupResult.user.id;

      const loginRequest = new Request('http://localhost/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'sessiontest@example.com',
          password: 'TestPass123!',
        }),
      });
      const loginResponse = await auth.handler(loginRequest);
      const loginResult = await loginResponse.json();
      sessionToken = loginResult.session.token;
    });

    it('should list user sessions', async () => {
      const listRequest = new Request('http://localhost/api/auth/list-sessions', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
        },
      });

      const response = await auth.handler(listRequest);
      const sessions = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(sessions)).toBe(true);
      expect(sessions.length).toBeGreaterThan(0);
      expect(sessions[0].userId).toBe(userId);
    });

    it('should revoke a specific session', async () => {
      // Create another session
      const secondLoginRequest = new Request('http://localhost/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'sessiontest@example.com',
          password: 'TestPass123!',
        }),
      });
      const secondLoginResponse = await auth.handler(secondLoginRequest);
      const secondSession = await secondLoginResponse.json();

      // Revoke the second session
      const revokeRequest = new Request('http://localhost/api/auth/revoke-session', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: secondSession.session.id,
        }),
      });

      const response = await auth.handler(revokeRequest);
      expect(response.status).toBe(200);

      // Verify session is revoked
      const session = await mongoClient.db().collection('session').findOne({
        id: secondSession.session.id,
      });
      expect(session).toBeNull();

      // Verify audit log
      const auditLogs = await prisma.auditLog.findMany({
        where: {
          userId,
          action: 'session_revoked',
        },
      });
      expect(auditLogs).toHaveLength(1);
    });
  });

  describe('Password Reset Flow', () => {
    let userId: string;

    beforeEach(async () => {
      // Create test user
      const signupRequest = new Request('http://localhost/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'resettest@example.com',
          password: 'OldPass123!',
          name: 'Reset Test',
        }),
      });
      const response = await auth.handler(signupRequest);
      const result = await response.json();
      userId = result.user.id;
    });

    it('should handle forgot password request', async () => {
      const forgotRequest = new Request('http://localhost/api/auth/forget-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'resettest@example.com',
          redirectTo: '/reset-password',
        }),
      });

      const response = await auth.handler(forgotRequest);
      expect(response.status).toBe(200);

      // Verify audit log
      const auditLogs = await prisma.auditLog.findMany({
        where: {
          userId,
          action: 'password_reset_requested',
        },
      });
      expect(auditLogs).toHaveLength(1);
    });

    it('should apply rate limiting to password reset requests', async () => {
      const email = 'resettest@example.com';
      
      // Make multiple reset requests
      for (let i = 0; i < 3; i++) {
        await RateLimitService.recordAttempt(email, 'password_reset');
      }

      // Check rate limit
      const limitCheck = await RateLimitService.checkLimit(email, 'password_reset');
      expect(limitCheck.allowed).toBe(false);
    });
  });

  describe('Logout Flow', () => {
    let sessionToken: string;
    let userId: string;

    beforeEach(async () => {
      // Create and login user
      const signupRequest = new Request('http://localhost/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'logouttest@example.com',
          password: 'TestPass123!',
          name: 'Logout Test',
        }),
      });
      await auth.handler(signupRequest);

      const loginRequest = new Request('http://localhost/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'logouttest@example.com',
          password: 'TestPass123!',
        }),
      });
      const loginResponse = await auth.handler(loginRequest);
      const loginResult = await loginResponse.json();
      sessionToken = loginResult.session.token;
      userId = loginResult.user.id;
    });

    it('should logout and invalidate session', async () => {
      const logoutRequest = new Request('http://localhost/api/auth/sign-out', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
        },
      });

      const response = await auth.handler(logoutRequest);
      expect(response.status).toBe(200);

      // Verify session is removed
      const session = await mongoClient.db().collection('session').findOne({
        token: sessionToken,
      });
      expect(session).toBeNull();

      // Verify audit log
      const auditLogs = await prisma.auditLog.findMany({
        where: {
          userId,
          action: 'logout',
        },
      });
      expect(auditLogs).toHaveLength(1);
    });
  });
});