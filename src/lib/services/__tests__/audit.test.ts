import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuditService } from '../audit';

// Mock PrismaClient
vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn().mockImplementation(() => ({
    auditLog: {
      create: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn(),
    },
  })),
}));

describe('AuditService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('log', () => {
    it('should create an audit log entry', async () => {
      const logData = {
        userId: 'user123',
        action: 'login' as const,
        details: { test: 'data' },
        ip: '127.0.0.1',
        userAgent: 'Test Browser',
        success: true,
      };

      await expect(AuditService.log(logData)).resolves.not.toThrow();
    });

    it('should not throw on database errors', async () => {
      const prisma = new (await import('@prisma/client')).PrismaClient();
      (prisma.auditLog.create as any).mockRejectedValueOnce(new Error('DB Error'));

      const logData = {
        userId: 'user123',
        action: 'login' as const,
      };

      await expect(AuditService.log(logData)).resolves.not.toThrow();
    });
  });

  describe('logAuth', () => {
    it('should log authentication events with request details', async () => {
      const mockRequest = new Request('http://localhost/test', {
        headers: {
          'x-forwarded-for': '192.168.1.1',
          'user-agent': 'Mozilla/5.0',
        },
      });

      await expect(
        AuditService.logAuth('user123', 'login', mockRequest, true)
      ).resolves.not.toThrow();
    });

    it('should handle missing headers gracefully', async () => {
      const mockRequest = new Request('http://localhost/test');

      await expect(
        AuditService.logAuth('user123', 'logout', mockRequest)
      ).resolves.not.toThrow();
    });
  });

  describe('getUserAuditLogs', () => {
    it('should retrieve user audit logs with pagination', async () => {
      const mockLogs = [
        { id: '1', userId: 'user123', action: 'login', createdAt: new Date(), success: true, error: null },
        { id: '2', userId: 'user123', action: 'logout', createdAt: new Date(), success: true, error: null },
      ];

      const prisma = new (await import('@prisma/client')).PrismaClient();
      (prisma.auditLog.findMany as any).mockResolvedValueOnce(mockLogs);
      (prisma.auditLog.count as any).mockResolvedValueOnce(2);

      const result = await AuditService.getUserAuditLogs('user123', {
        limit: 10,
        offset: 0,
      });

      expect(result).toEqual({
        logs: mockLogs,
        total: 2,
        page: 1,
        totalPages: 1,
      });
    });

    it('should filter by action type', async () => {
      const prisma = new (await import('@prisma/client')).PrismaClient();
      (prisma.auditLog.findMany as any).mockResolvedValueOnce([]);
      (prisma.auditLog.count as any).mockResolvedValueOnce(0);

      await AuditService.getUserAuditLogs('user123', {
        action: 'login',
      });

      expect(prisma.auditLog.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            userId: 'user123',
            action: 'login',
          }),
        })
      );
    });

    it('should filter by date range', async () => {
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-12-31');

      const prisma = new (await import('@prisma/client')).PrismaClient();
      (prisma.auditLog.findMany as any).mockResolvedValueOnce([]);
      (prisma.auditLog.count as any).mockResolvedValueOnce(0);

      await AuditService.getUserAuditLogs('user123', {
        startDate,
        endDate,
      });

      expect(prisma.auditLog.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            userId: 'user123',
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          }),
        })
      );
    });
  });

  describe('exportAuditLogs', () => {
    it('should export logs as JSON', async () => {
      const mockLogs = [
        { id: '1', userId: 'user123', action: 'login', createdAt: new Date(), success: true, error: null },
      ];

      const prisma = new (await import('@prisma/client')).PrismaClient();
      (prisma.auditLog.findMany as any).mockResolvedValueOnce(mockLogs);

      const result = await AuditService.exportAuditLogs('user123', 'json');
      const parsed = JSON.parse(result);

      expect(parsed).toEqual(mockLogs);
    });

    it('should export logs as CSV', async () => {
      const mockLogs = [
        {
          id: '1',
          userId: 'user123',
          action: 'login',
          success: true,
          ip: '127.0.0.1',
          userAgent: 'Test',
          createdAt: new Date('2024-01-01'),
          details: { test: 'data' },
          error: null,
        },
      ];

      const prisma = new (await import('@prisma/client')).PrismaClient();
      (prisma.auditLog.findMany as any).mockResolvedValueOnce(mockLogs);

      const result = await AuditService.exportAuditLogs('user123', 'csv');

      expect(result).toContain('ID,User ID,Action,Success,IP,User Agent,Created At,Details');
      expect(result).toContain('user123');
      expect(result).toContain('login');
    });
  });
});