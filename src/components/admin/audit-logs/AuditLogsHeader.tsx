// src/components/admin/audit-logs/AuditLogsHeader.tsx

import { useCallback } from 'react';
import { getAuditLogs } from '@/lib/api/audit-logs';
import { Container, Button, Div, H1, P } from '@/lib/dev-container';
import { Download } from 'lucide-react';

interface AuditLogsHeaderProps {
  filterAction: string;
  filterUserId: string;
  startDate: string;
  endDate: string;
}

export function AuditLogsHeader({ 
  filterAction, 
  filterUserId, 
  startDate, 
  endDate 
}: AuditLogsHeaderProps) {
  const handleExport = useCallback(async () => {
    try {
      const response = await getAuditLogs({
        limit: 10000, // Get all logs for export
        action: filterAction || undefined,
        userId: filterUserId || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      });
      
      // Convert to CSV
      const headers = ['Date', 'User', 'Email', 'Action', 'Status', 'IP Address', 'Details'];
      const rows = response.logs.map(log => [
        new Date(log.createdAt).toLocaleString(),
        log.userName || 'Unknown',
        log.userEmail || log.userId,
        getActionLabel(log.action),
        log.success ? 'Success' : 'Failed',
        log.ip || 'Unknown',
        log.details ? JSON.stringify(log.details) : ''
      ]);
      
      const csv = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      ].join('\n');
      
      // Download
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exporting logs:', err);
      // Could show a toast notification here instead
    }
  }, [filterAction, filterUserId, startDate, endDate]);

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      login: 'Signed in',
      logout: 'Signed out',
      login_failed: 'Failed login attempt',
      user_created: 'Account created',
      user_updated: 'User updated',
      user_deleted: 'User deleted',
      role_changed: 'Role changed',
      password_change: 'Password changed',
      password_reset_request: 'Password reset requested',
      password_reset_complete: 'Password reset completed',
      email_verification: 'Email verified',
      session_revoked: 'Session revoked',
      sessions_revoked_all: 'All sessions revoked',
      profile_update: 'Profile updated',
      admin_access: 'Admin panel accessed',
    };
    return labels[action] || action;
  };

  return (
    <Container componentId="audit-logs-header">
      <Div devId="header-content" className="flex items-center justify-between">
        <Div devId="header-text">
          <H1 devId="header-title" className="text-3xl font-bold text-gray-900">
            Audit Logs
          </H1>
          <P devId="header-description" className="text-gray-600 mt-1">
            Monitor all system activity and security events
          </P>
        </Div>
        <Button
          devId="export-button"
          variant="outline"
          onClick={handleExport}
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </Div>
    </Container>
  );
}

