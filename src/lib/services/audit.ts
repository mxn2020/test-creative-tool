// src/lib/services/audit.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type AuditAction = 
  | 'login'
  | 'logout'
  | 'login_failed'
  | 'password_change'
  | 'password_reset_request'
  | 'password_reset_complete'
  | 'profile_update'
  | 'email_verification'
  | 'user_created'
  | 'user_updated'
  | 'user_deleted'
  | 'role_changed'
  | 'session_revoked'
  | 'sessions_revoked_all'
  | 'admin_access';

export interface AuditLogData {
  userId: string;
  action: AuditAction;
  details?: any;
  ip?: string;
  userAgent?: string;
  success?: boolean;
  error?: string;
}

export class AuditService {
  static async log(data: AuditLogData): Promise<void> {
    try {
      await prisma.auditLog.create({
        data: {
          userId: data.userId,
          action: data.action,
          details: data.details || undefined,
          ip: data.ip,
          userAgent: data.userAgent,
          success: data.success ?? true,
          error: data.error,
        },
      });
    } catch (error) {
      console.error('[AuditService] Failed to create audit log:', error);
      // Don't throw - audit logging should not break the application
    }
  }

  static async logAuth(
    userId: string,
    action: Extract<AuditAction, 'login' | 'logout' | 'login_failed'>,
    request: Request,
    success: boolean = true,
    error?: string
  ): Promise<void> {
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const userAgent = request.headers.get('user-agent') || undefined;

    await this.log({
      userId,
      action,
      ip,
      userAgent,
      success,
      error,
      details: {
        timestamp: new Date().toISOString(),
      },
    });
  }

  static async logUserAction(
    userId: string,
    action: AuditAction,
    details?: any,
    request?: Request
  ): Promise<void> {
    const ip = request ? 
      (request.headers.get('x-forwarded-for') || 
       request.headers.get('x-real-ip') || 
       'unknown') : undefined;
    const userAgent = request?.headers.get('user-agent') || undefined;

    await this.log({
      userId,
      action,
      details,
      ip,
      userAgent,
    });
  }

  static async getUserAuditLogs(
    userId: string,
    options?: {
      limit?: number;
      offset?: number;
      action?: AuditAction;
      startDate?: Date;
      endDate?: Date;
    }
  ) {
    const where: any = { userId };

    if (options?.action) {
      where.action = options.action;
    }

    if (options?.startDate || options?.endDate) {
      where.createdAt = {};
      if (options.startDate) {
        where.createdAt.gte = options.startDate;
      }
      if (options.endDate) {
        where.createdAt.lte = options.endDate;
      }
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: options?.limit || 50,
        skip: options?.offset || 0,
      }),
      prisma.auditLog.count({ where }),
    ]);

    return {
      logs,
      total,
      page: Math.floor((options?.offset || 0) / (options?.limit || 50)) + 1,
      totalPages: Math.ceil(total / (options?.limit || 50)),
    };
  }

  static async getAllAuditLogs(options?: {
    limit?: number;
    offset?: number;
    userId?: string;
    action?: AuditAction;
    startDate?: Date;
    endDate?: Date;
  }) {
    const where: any = {};

    if (options?.userId) {
      where.userId = options.userId;
    }

    if (options?.action) {
      where.action = options.action;
    }

    if (options?.startDate || options?.endDate) {
      where.createdAt = {};
      if (options.startDate) {
        where.createdAt.gte = options.startDate;
      }
      if (options.endDate) {
        where.createdAt.lte = options.endDate;
      }
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: options?.limit || 50,
        skip: options?.offset || 0,
      }),
      prisma.auditLog.count({ where }),
    ]);

    return {
      logs,
      total,
      page: Math.floor((options?.offset || 0) / (options?.limit || 50)) + 1,
      totalPages: Math.ceil(total / (options?.limit || 50)),
    };
  }

  static async exportAuditLogs(
    userId?: string,
    format: 'json' | 'csv' = 'json'
  ): Promise<string> {
    const where = userId ? { userId } : {};
    const logs = await prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    if (format === 'json') {
      return JSON.stringify(logs, null, 2);
    } else {
      // CSV format
      const headers = ['ID', 'User ID', 'Action', 'Success', 'IP', 'User Agent', 'Created At', 'Details'];
      const rows = logs.map(log => [
        log.id,
        log.userId,
        log.action,
        log.success,
        log.ip || '',
        log.userAgent || '',
        log.createdAt.toISOString(),
        JSON.stringify(log.details || {}),
      ]);

      const csv = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
      ].join('\n');

      return csv;
    }
  }
}

export const auditService = AuditService;