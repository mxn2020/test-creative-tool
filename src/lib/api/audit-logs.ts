// src/lib/api/audit-logs.ts

export interface AuditLog {
  id: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  action: string;
  details?: any;
  ip?: string;
  userAgent?: string;
  success: boolean;
  error?: string;
  createdAt: string;
}

export interface AuditLogsResponse {
  logs: AuditLog[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
  isAdmin: boolean;
}

export interface AuditLogsParams {
  page?: number;
  limit?: number;
  userId?: string;
  action?: string;
  startDate?: string;
  endDate?: string;
}

function getApiUrl() {
  // In production, API routes are at the same origin
  // In development, they might be at a different port
  const baseUrl = import.meta.env.VITE_API_URL || '';
  return `${baseUrl}/api`;
}

export async function getAuditLogs(params?: AuditLogsParams): Promise<AuditLogsResponse> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.userId) queryParams.append('userId', params.userId);
  if (params?.action) queryParams.append('action', params.action);
  if (params?.startDate) queryParams.append('startDate', params.startDate);
  if (params?.endDate) queryParams.append('endDate', params.endDate);

  const response = await fetch(`${getApiUrl()}/admin-audit-logs?${queryParams}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    if (response.status === 401) {
      const errorData = await response.json().catch(() => ({ error: 'Unauthorized' }));
      throw new Error(errorData.error || 'Not authenticated. Please log in again.');
    }
    if (response.status === 403) {
      throw new Error('Access denied. Admin privileges required.');
    }
    throw new Error(`Failed to fetch audit logs: ${response.statusText}`);
  }

  return response.json();
}