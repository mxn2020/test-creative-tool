// src/components/admin/audit-logs/AuditLogsTable.tsx

import { Container, Card, Badge, Span, Div, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/lib/dev-container';
import { 
  Activity,
  LogIn,
  LogOut,
  UserPlus,
  KeyRound,
  UserCheck,
  ShieldAlert,
  Monitor,
  Settings,
  Shield,
  UserCog,
  Trash2
} from 'lucide-react';

interface AuditLog {
  id: string;
  createdAt: string;
  userName?: string;
  userEmail?: string;
  userId: string;
  action: string;
  success: boolean;
  ip?: string;
  error?: string;
  details?: {
    targetUserId?: string;
    targetUserEmail?: string;
    targetUserName?: string;
    oldRole?: string;
    newRole?: string;
    count?: number;
  };
}

interface AuditLogsTableProps {
  logs: AuditLog[];
}

export function AuditLogsTable({ logs }: AuditLogsTableProps) {
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'login':
        return LogIn;
      case 'logout':
        return LogOut;
      case 'login_failed':
        return ShieldAlert;
      case 'user_created':
        return UserPlus;
      case 'user_updated':
      case 'role_changed':
        return UserCog;
      case 'user_deleted':
        return Trash2;
      case 'password_change':
      case 'password_reset_request':
      case 'password_reset_complete':
        return KeyRound;
      case 'email_verification':
        return UserCheck;
      case 'session_revoked':
      case 'sessions_revoked_all':
        return Monitor;
      case 'profile_update':
        return Settings;
      case 'admin_access':
        return Shield;
      default:
        return Activity;
    }
  };

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

  const getActionColor = (action: string, success: boolean) => {
    if (!success) return 'destructive';
    
    switch (action) {
      case 'login':
      case 'user_created':
      case 'email_verification':
        return 'default';
      case 'logout':
      case 'session_revoked':
      case 'sessions_revoked_all':
        return 'secondary';
      case 'login_failed':
      case 'user_deleted':
        return 'destructive';
      case 'role_changed':
      case 'admin_access':
        return 'outline';
      case 'password_change':
      case 'password_reset_request':
      case 'password_reset_complete':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Container componentId="audit-logs-table">
      <Card devId="logs-table-card" className="overflow-hidden">
        <Div devId="table-wrapper" className="overflow-x-auto">
          <Table devId="audit-logs-table" className="w-full">
            <TableHeader devId="audit-logs-thead" className="bg-gray-50 border-b border-gray-200">
              <TableRow devId="audit-logs-header-row">
                <TableHead devId="header-time" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </TableHead>
                <TableHead devId="header-user" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </TableHead>
                <TableHead devId="header-action" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </TableHead>
                <TableHead devId="header-status" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead devId="header-ip" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </TableHead>
                <TableHead devId="header-details" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody devId="audit-logs-tbody" className="bg-white divide-y divide-gray-200">
              {logs.length === 0 ? (
                <TableRow devId="empty-row">
                  <TableCell devId="empty-cell" colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No audit logs found
                  </TableCell>
                </TableRow>
              ) : (
                logs.map((log) => {
                  const Icon = getActionIcon(log.action);
                  return (
                    <TableRow key={log.id} devId={`log-row-${log.id}`} className="hover:bg-gray-50">
                      <TableCell devId={`time-cell-${log.id}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(log.createdAt)}
                      </TableCell>
                      <TableCell devId={`user-cell-${log.id}`} className="px-6 py-4 whitespace-nowrap">
                        <Div devId={`user-info-${log.id}`} className="text-sm">
                          <Div devId={`user-name-${log.id}`} className="font-medium text-gray-900">
                            {log.userName || 'Unknown'}
                          </Div>
                          <Div devId={`user-email-${log.id}`} className="text-gray-500">
                            {log.userEmail || log.userId}
                          </Div>
                        </Div>
                      </TableCell>
                      <TableCell devId={`action-cell-${log.id}`} className="px-6 py-4 whitespace-nowrap">
                        <Div devId={`action-info-${log.id}`} className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-gray-400" />
                          <Span devId={`action-label-${log.id}`} className="text-sm text-gray-900">
                            {getActionLabel(log.action)}
                          </Span>
                        </Div>
                      </TableCell>
                      <TableCell devId={`status-cell-${log.id}`} className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          devId={`status-badge-${log.id}`}
                          variant={getActionColor(log.action, log.success)}
                        >
                          {log.success ? 'Success' : 'Failed'}
                        </Badge>
                      </TableCell>
                      <TableCell devId={`ip-cell-${log.id}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.ip || 'Unknown'}
                      </TableCell>
                      <TableCell devId={`details-cell-${log.id}`} className="px-6 py-4 text-sm text-gray-500">
                        {log.error && (
                          <Span devId={`error-message-${log.id}`} className="text-red-600">{log.error}</Span>
                        )}
                        {log.details && (
                          <Div devId={`details-info-${log.id}`} className="max-w-xs truncate">
                            {log.action === 'role_changed' && log.details.targetUserId && (
                              <Span devId={`role-change-details-${log.id}`}>
                                Changed user role from {log.details.oldRole} to {log.details.newRole}
                              </Span>
                            )}
                            {log.action === 'user_deleted' && log.details.targetUserEmail && (
                              <Span devId={`user-delete-details-${log.id}`}>
                                Deleted user: {log.details.targetUserName} ({log.details.targetUserEmail})
                              </Span>
                            )}
                            {log.action === 'sessions_revoked_all' && log.details.count && (
                              <Span devId={`sessions-revoked-details-${log.id}`}>{log.details.count} sessions revoked</Span>
                            )}
                          </Div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </Div>
      </Card>
    </Container>
  );
}

