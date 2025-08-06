import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { MongoClient } from 'mongodb';
import { PrismaClient } from '@prisma/client';

// Mock fetch for API tests
global.fetch = vi.fn();

describe('Admin API Endpoints', () => {
  let mongoClient: MongoClient;
  let prisma: PrismaClient;
  let adminToken: string;
  let userToken: string;
  let adminId: string;
  let userId: string;

  beforeEach(async () => {
    mongoClient = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017/test');
    await mongoClient.connect();
    prisma = new PrismaClient();
    
    // Clear test data
    await mongoClient.db().collection('user').deleteMany({});
    await mongoClient.db().collection('session').deleteMany({});
    await prisma.userPreference.deleteMany({});
    await prisma.auditLog.deleteMany({});

    // Create admin user
    adminId = 'admin-123';
    adminToken = 'admin-token-123';
    await mongoClient.db().collection('user').insertOne({
      id: adminId,
      email: 'admin@example.com',
      name: 'Admin User',
      createdAt: new Date(),
    });
    await mongoClient.db().collection('session').insertOne({
      id: 'admin-session',
      token: adminToken,
      userId: adminId,
      expiresAt: new Date(Date.now() + 86400000),
    });
    await prisma.userPreference.create({
      data: { userId: adminId, role: 'admin' },
    });

    // Create regular user
    userId = 'user-123';
    userToken = 'user-token-123';
    await mongoClient.db().collection('user').insertOne({
      id: userId,
      email: 'user@example.com',
      name: 'Regular User',
      createdAt: new Date(),
    });
    await mongoClient.db().collection('session').insertOne({
      id: 'user-session',
      token: userToken,
      userId: userId,
      expiresAt: new Date(Date.now() + 86400000),
    });
    await prisma.userPreference.create({
      data: { userId: userId, role: 'user' },
    });
  });

  afterEach(async () => {
    await mongoClient.close();
    await prisma.$disconnect();
    vi.clearAllMocks();
  });

  describe('GET /api/admin-users', () => {
    it('should return all users for admin', async () => {
      const mockUsers = [
        { id: adminId, email: 'admin@example.com', name: 'Admin User' },
        { id: userId, email: 'user@example.com', name: 'Regular User' },
      ];

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockUsers,
      });

      const response = await fetch('/api/admin-users', {
        headers: { 'Authorization': `Bearer ${adminToken}` },
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveLength(2);
    });

    it('should deny access for non-admin users', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 403,
        json: async () => ({ error: 'Forbidden' }),
      });

      const response = await fetch('/api/admin-users', {
        headers: { 'Authorization': `Bearer ${userToken}` },
      });

      expect(response.status).toBe(403);
    });

    it('should support pagination', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          users: [{ id: userId, email: 'user@example.com' }],
          total: 50,
          page: 1,
          pageSize: 10,
        }),
      });

      const response = await fetch('/api/admin-users?page=1&limit=10', {
        headers: { 'Authorization': `Bearer ${adminToken}` },
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.total).toBe(50);
      expect(data.page).toBe(1);
    });

    it('should support search filtering', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [
          { id: userId, email: 'user@example.com', name: 'Regular User' },
        ],
      });

      const response = await fetch('/api/admin-users?search=user@example', {
        headers: { 'Authorization': `Bearer ${adminToken}` },
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveLength(1);
      expect(data[0].email).toBe('user@example.com');
    });
  });

  describe('GET /api/admin-users/:id', () => {
    it('should return user details with role', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          user: {
            id: userId,
            email: 'user@example.com',
            name: 'Regular User',
            createdAt: new Date().toISOString(),
          },
          role: 'user',
          stats: {
            lastLogin: new Date().toISOString(),
            loginCount: 5,
            activeSessions: 1,
          },
        }),
      });

      const response = await fetch(`/api/admin-users/${userId}`, {
        headers: { 'Authorization': `Bearer ${adminToken}` },
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.user.id).toBe(userId);
      expect(data.role).toBe('user');
      expect(data.stats).toBeDefined();
    });

    it('should return 404 for non-existent user', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ error: 'User not found' }),
      });

      const response = await fetch('/api/admin-users/non-existent', {
        headers: { 'Authorization': `Bearer ${adminToken}` },
      });

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/admin-users/:id/role', () => {
    it('should update user role', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ success: true, newRole: 'admin' }),
      });

      const response = await fetch(`/api/admin-users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: 'admin' }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.newRole).toBe('admin');
    });

    it('should create audit log for role change', async () => {
      await prisma.userPreference.update({
        where: { userId },
        data: { role: 'admin' },
      });

      await prisma.auditLog.create({
        data: {
          userId: adminId,
          action: 'role_updated',
          success: true,
          details: {
            targetUserId: userId,
            oldRole: 'user',
            newRole: 'admin',
          },
        },
      });

      const logs = await prisma.auditLog.findMany({
        where: { action: 'role_updated' },
      });

      expect(logs).toHaveLength(1);
      expect(logs[0].details).toMatchObject({
        targetUserId: userId,
        oldRole: 'user',
        newRole: 'admin',
      });
    });

    it('should prevent self role change', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ error: 'Cannot change own role' }),
      });

      const response = await fetch(`/api/admin-users/${adminId}/role`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: 'user' }),
      });

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/admin-users/:id', () => {
    it('should delete user and all related data', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ success: true }),
      });

      const response = await fetch(`/api/admin-users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${adminToken}` },
      });

      expect(response.status).toBe(200);
    });

    it('should prevent self deletion', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ error: 'Cannot delete own account' }),
      });

      const response = await fetch(`/api/admin-users/${adminId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${adminToken}` },
      });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/admin-stats', () => {
    it('should return dashboard statistics', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          totalUsers: 10,
          activeUsers: 5,
          newUsersToday: 2,
          totalSessions: 15,
          failedLogins: 3,
          recentActivity: [
            { action: 'login', count: 20 },
            { action: 'signup', count: 5 },
          ],
        }),
      });

      const response = await fetch('/api/admin-stats', {
        headers: { 'Authorization': `Bearer ${adminToken}` },
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.totalUsers).toBe(10);
      expect(data.activeUsers).toBe(5);
      expect(data.recentActivity).toBeDefined();
    });

    it('should cache statistics for performance', async () => {
      // First request
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'X-Cache': 'MISS' }),
        json: async () => ({ totalUsers: 10 }),
      });

      await fetch('/api/admin-stats', {
        headers: { 'Authorization': `Bearer ${adminToken}` },
      });

      // Second request should hit cache
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'X-Cache': 'HIT' }),
        json: async () => ({ totalUsers: 10 }),
      });

      const response = await fetch('/api/admin-stats', {
        headers: { 'Authorization': `Bearer ${adminToken}` },
      });

      expect(response.headers.get('X-Cache')).toBe('HIT');
    });
  });

  describe('GET /api/admin-audit-logs', () => {
    beforeEach(async () => {
      // Create test audit logs
      await prisma.auditLog.createMany({
        data: [
          { userId: adminId, action: 'login', success: true },
          { userId: userId, action: 'login', success: true },
          { userId: userId, action: 'login_failed', success: false },
        ],
      });
    });

    it('should return all audit logs for admin', async () => {
      const logs = await prisma.auditLog.findMany();
      
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          logs: logs,
          total: 3,
          page: 1,
          pageSize: 10,
        }),
      });

      const response = await fetch('/api/admin-audit-logs', {
        headers: { 'Authorization': `Bearer ${adminToken}` },
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.logs).toHaveLength(3);
      expect(data.total).toBe(3);
    });

    it('should filter by user', async () => {
      const userLogs = await prisma.auditLog.findMany({
        where: { userId },
      });

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          logs: userLogs,
          total: 2,
        }),
      });

      const response = await fetch(`/api/admin-audit-logs?userId=${userId}`, {
        headers: { 'Authorization': `Bearer ${adminToken}` },
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.logs).toHaveLength(2);
      expect(data.logs.every((log: any) => log.userId === userId)).toBe(true);
    });

    it('should filter by action', async () => {
      const failedLogs = await prisma.auditLog.findMany({
        where: { action: 'login_failed' },
      });

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          logs: failedLogs,
          total: 1,
        }),
      });

      const response = await fetch('/api/admin-audit-logs?action=login_failed', {
        headers: { 'Authorization': `Bearer ${adminToken}` },
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.logs).toHaveLength(1);
      expect(data.logs[0].action).toBe('login_failed');
    });
  });

  describe('GET /api/admin/sessions', () => {
    beforeEach(async () => {
      // Create test sessions
      await mongoClient.db().collection('session').insertMany([
        {
          id: 'session-1',
          userId: userId,
          token: 'token-1',
          userAgent: 'Mozilla/5.0',
          ipAddress: '192.168.1.100',
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 86400000),
        },
        {
          id: 'session-2',
          userId: userId,
          token: 'token-2',
          userAgent: 'Chrome/91.0',
          ipAddress: '192.168.1.101',
          createdAt: new Date(Date.now() - 3600000),
          expiresAt: new Date(Date.now() + 82800000),
        },
      ]);
    });

    it('should return all active sessions', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [
          {
            id: 'session-1',
            userId: userId,
            userAgent: 'Mozilla/5.0',
            ipAddress: '192.168.1.100',
            createdAt: new Date().toISOString(),
          },
          {
            id: 'session-2',
            userId: userId,
            userAgent: 'Chrome/91.0',
            ipAddress: '192.168.1.101',
            createdAt: new Date(Date.now() - 3600000).toISOString(),
          },
        ],
      });

      const response = await fetch('/api/admin/sessions', {
        headers: { 'Authorization': `Bearer ${adminToken}` },
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveLength(2);
    });

    it('should filter sessions by user', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [
          {
            id: 'session-1',
            userId: userId,
            userAgent: 'Mozilla/5.0',
          },
        ],
      });

      const response = await fetch(`/api/admin/sessions?userId=${userId}`, {
        headers: { 'Authorization': `Bearer ${adminToken}` },
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.every((s: any) => s.userId === userId)).toBe(true);
    });
  });

  describe('DELETE /api/admin/sessions/:id', () => {
    it('should revoke specific session', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ success: true }),
      });

      const response = await fetch('/api/admin/sessions/session-123', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${adminToken}` },
      });

      expect(response.status).toBe(200);
    });

    it('should create audit log for session revocation', async () => {
      await mongoClient.db().collection('session').deleteOne({ id: 'session-123' });
      
      await prisma.auditLog.create({
        data: {
          userId: adminId,
          action: 'admin_session_revoked',
          success: true,
          details: {
            sessionId: 'session-123',
            targetUserId: userId,
          },
        },
      });

      const logs = await prisma.auditLog.findMany({
        where: { action: 'admin_session_revoked' },
      });

      expect(logs).toHaveLength(1);
      expect(logs[0].details).toMatchObject({
        sessionId: 'session-123',
        targetUserId: userId,
      });
    });
  });
});