import { useQuery } from '@tanstack/react-query';
import { getAuditLogs, type AuditLogsParams } from '../lib/api/audit-logs';

// Query keys
export const auditLogKeys = {
  all: ['auditLogs'] as const,
  lists: () => [...auditLogKeys.all, 'list'] as const,
  list: (params: AuditLogsParams) => [...auditLogKeys.lists(), params] as const,
};

// Fetch audit logs with filters
export function useAuditLogs(params: AuditLogsParams) {
  return useQuery({
    queryKey: auditLogKeys.list(params),
    queryFn: () => getAuditLogs(params),
    staleTime: 30 * 1000, // Consider data fresh for 30 seconds
  });
}