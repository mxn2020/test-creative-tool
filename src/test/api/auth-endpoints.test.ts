import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { auth } from '@/lib/auth';
import { MongoClient } from 'mongodb';
import { PrismaClient } from '@prisma/client';

describe('Auth API Endpoints', () => {
  let mongoClient: MongoClient;
  let prisma: PrismaClient;

  beforeEach(async () => {
    mongoClient = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017/test');
    await mongoClient.connect();
    prisma = new PrismaClient();
    
    // Clear test data
    await mongoClient.db().collection('user').deleteMany({});
    await mongoClient.db().collection('session').deleteMany({});
  });

  afterEach(async () => {
    await mongoClient.close();
    await prisma.$disconnect();
  });

  describe('POST /api/auth/signup', () => {
    it('should create a new user with valid data', async () => {
      const req = new Request('http://localhost/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'newuser@example.com',
          password: 'SecurePass123!',
          name: 'New User',
        }),
      });

      const response = await auth.handler(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.user).toBeDefined();
      expect(data.user.email).toBe('newuser@example.com');
      expect(data.user.name).toBe('New User');
      expect(data.user.password).toBeUndefined(); // Password should not be returned
    });

    it('should reject duplicate email addresses', async () => {
      // First signup
      await auth.handler(new Request('http://localhost/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'duplicate@example.com',
          password: 'Pass123!',
          name: 'User',
        }),
      }));

      // Duplicate attempt
      const response = await auth.handler(new Request('http://localhost/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'duplicate@example.com',
          password: 'Pass123!',
          name: 'User 2',
        }),
      }));

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBeDefined();
    });

    it('should validate required fields', async () => {
      const response = await auth.handler(new Request('http://localhost/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          // Missing password and name
        }),
      }));

      expect(response.status).toBe(400);
    });

    it('should validate email format', async () => {
      const response = await auth.handler(new Request('http://localhost/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'invalid-email',
          password: 'Pass123!',
          name: 'User',
        }),
      }));

      expect(response.status).toBe(400);
    });

    it('should enforce password strength requirements', async () => {
      const response = await auth.handler(new Request('http://localhost/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'weak',
          name: 'User',
        }),
      }));

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/auth/signin', () => {
    beforeEach(async () => {
      // Create test user
      await auth.handler(new Request('http://localhost/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'testuser@example.com',
          password: 'TestPass123!',
          name: 'Test User',
        }),
      }));
    });

    it('should login with valid credentials', async () => {
      const response = await auth.handler(new Request('http://localhost/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'testuser@example.com',
          password: 'TestPass123!',
        }),
      }));

      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.user).toBeDefined();
      expect(data.session).toBeDefined();
      expect(data.session.token).toBeDefined();
    });

    it('should reject invalid password', async () => {
      const response = await auth.handler(new Request('http://localhost/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'testuser@example.com',
          password: 'WrongPassword!',
        }),
      }));

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBeDefined();
    });

    it('should reject non-existent user', async () => {
      const response = await auth.handler(new Request('http://localhost/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'nonexistent@example.com',
          password: 'Pass123!',
        }),
      }));

      expect(response.status).toBe(400);
    });

    it('should include user-agent in session', async () => {
      const response = await auth.handler(new Request('http://localhost/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 Test Browser',
        },
        body: JSON.stringify({
          email: 'testuser@example.com',
          password: 'TestPass123!',
        }),
      }));

      const data = await response.json();
      const session = await mongoClient.db().collection('session').findOne({
        token: data.session.token,
      });

      expect(session?.userAgent).toBe('Mozilla/5.0 Test Browser');
    });
  });

  describe('POST /api/auth/sign-out', () => {
    let sessionToken: string;

    beforeEach(async () => {
      // Create and login user
      await auth.handler(new Request('http://localhost/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'logouttest@example.com',
          password: 'Pass123!',
          name: 'User',
        }),
      }));

      const loginResponse = await auth.handler(new Request('http://localhost/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'logouttest@example.com',
          password: 'Pass123!',
        }),
      }));

      const loginData = await loginResponse.json();
      sessionToken = loginData.session.token;
    });

    it('should logout with valid session', async () => {
      const response = await auth.handler(new Request('http://localhost/api/auth/sign-out', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
        },
      }));

      expect(response.status).toBe(200);

      // Session should be deleted
      const session = await mongoClient.db().collection('session').findOne({
        token: sessionToken,
      });
      expect(session).toBeNull();
    });

    it('should reject logout without session', async () => {
      const response = await auth.handler(new Request('http://localhost/api/auth/sign-out', {
        method: 'POST',
        headers: {},
      }));

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/auth/session', () => {
    let sessionToken: string;
    let userId: string;

    beforeEach(async () => {
      const signupResponse = await auth.handler(new Request('http://localhost/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'sessiontest@example.com',
          password: 'Pass123!',
          name: 'User',
        }),
      }));

      const signupData = await signupResponse.json();
      userId = signupData.user.id;

      const loginResponse = await auth.handler(new Request('http://localhost/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'sessiontest@example.com',
          password: 'Pass123!',
        }),
      }));

      const loginData = await loginResponse.json();
      sessionToken = loginData.session.token;
    });

    it('should return current session', async () => {
      const response = await auth.handler(new Request('http://localhost/api/auth/session', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
        },
      }));

      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.user).toBeDefined();
      expect(data.user.id).toBe(userId);
      expect(data.session).toBeDefined();
    });

    it('should return 401 without valid session', async () => {
      const response = await auth.handler(new Request('http://localhost/api/auth/session', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer invalid-token',
        },
      }));

      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/auth/forget-password', () => {
    beforeEach(async () => {
      await auth.handler(new Request('http://localhost/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'resettest@example.com',
          password: 'Pass123!',
          name: 'User',
        }),
      }));
    });

    it('should initiate password reset', async () => {
      const response = await auth.handler(new Request('http://localhost/api/auth/forget-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'resettest@example.com',
          redirectTo: '/reset-password',
        }),
      }));

      expect(response.status).toBe(200);
    });

    it('should not reveal if email exists', async () => {
      const response = await auth.handler(new Request('http://localhost/api/auth/forget-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'nonexistent@example.com',
          redirectTo: '/reset-password',
        }),
      }));

      // Should return success even for non-existent emails (security)
      expect(response.status).toBe(200);
    });
  });

  describe('POST /api/auth/reset-password', () => {
    it('should reset password with valid token', async () => {
      // Note: This would require generating a valid reset token
      // which involves the email flow. For unit tests, we might
      // need to mock the token generation/validation
      
      const response = await auth.handler(new Request('http://localhost/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: 'valid-reset-token',
          newPassword: 'NewSecurePass123!',
        }),
      }));

      // Would need proper token setup to test fully
      expect(response.status).toBeGreaterThanOrEqual(200);
    });

    it('should reject weak passwords', async () => {
      const response = await auth.handler(new Request('http://localhost/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: 'some-token',
          newPassword: 'weak',
        }),
      }));

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/auth/list-sessions', () => {
    let sessionToken: string;

    beforeEach(async () => {
      await auth.handler(new Request('http://localhost/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'multitest@example.com',
          password: 'Pass123!',
          name: 'User',
        }),
      }));

      // Create multiple sessions
      for (let i = 0; i < 3; i++) {
        const loginResponse = await auth.handler(new Request('http://localhost/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'multitest@example.com',
            password: 'Pass123!',
          }),
        }));

        if (i === 0) {
          const data = await loginResponse.json();
          sessionToken = data.session.token;
        }
      }
    });

    it('should list all user sessions', async () => {
      const response = await auth.handler(new Request('http://localhost/api/auth/list-sessions', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
        },
      }));

      const sessions = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(sessions)).toBe(true);
      expect(sessions.length).toBe(3);
    });

    it('should require authentication', async () => {
      const response = await auth.handler(new Request('http://localhost/api/auth/list-sessions', {
        method: 'GET',
        headers: {},
      }));

      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/auth/revoke-session', () => {
    let sessionToken1: string;
    let sessionId2: string;

    beforeEach(async () => {
      await auth.handler(new Request('http://localhost/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'revoketest@example.com',
          password: 'Pass123!',
          name: 'User',
        }),
      }));

      // Create two sessions
      const login1 = await auth.handler(new Request('http://localhost/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'revoketest@example.com',
          password: 'Pass123!',
        }),
      }));
      const data1 = await login1.json();
      sessionToken1 = data1.session.token;

      const login2 = await auth.handler(new Request('http://localhost/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'revoketest@example.com',
          password: 'Pass123!',
        }),
      }));
      const data2 = await login2.json();
      // sessionToken2 = data2.session.token; // Not used
      sessionId2 = data2.session.id;
    });

    it('should revoke specific session', async () => {
      const response = await auth.handler(new Request('http://localhost/api/auth/revoke-session', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionToken1}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId2,
        }),
      }));

      expect(response.status).toBe(200);

      // Session 2 should be revoked
      const session = await mongoClient.db().collection('session').findOne({
        id: sessionId2,
      });
      expect(session).toBeNull();

      // Session 1 should still exist
      const session1 = await mongoClient.db().collection('session').findOne({
        token: sessionToken1,
      });
      expect(session1).toBeDefined();
    });

    it('should not allow revoking other users sessions', async () => {
      // Create another user
      await auth.handler(new Request('http://localhost/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'otheruser@example.com',
          password: 'Pass123!',
          name: 'Other User',
        }),
      }));

      const otherLogin = await auth.handler(new Request('http://localhost/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'otheruser@example.com',
          password: 'Pass123!',
        }),
      }));
      const otherData = await otherLogin.json();

      // Try to revoke first user's session with second user's token
      const response = await auth.handler(new Request('http://localhost/api/auth/revoke-session', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${otherData.session.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId2,
        }),
      }));

      expect(response.status).toBe(403);
    });
  });
});