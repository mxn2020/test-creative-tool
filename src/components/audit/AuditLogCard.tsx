import { Card, Badge } from '../../lib/dev-container';
import { 
  Shield, 
  Activity,
  LogIn,
  LogOut,
  UserPlus,
  KeyRound,
  UserCheck,
  ShieldAlert,
  Monitor,
  Settings,
  Clock
} from 'lucide-react';
import type { AuditLog } from '../../lib/api/audit-logs';

interface AuditLogCardProps {
  log: AuditLog;
}

export function AuditLogCard({ log }: AuditLogCardProps) {
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
      password_change: 'Password changed',
      password_reset_request: 'Password reset requested',
      password_reset_complete: 'Password reset completed',
      email_verification: 'Email verified',
      session_revoked: 'Session revoked',
      sessions_revoked_all: 'All sessions revoked',
      profile_update: 'Profile updated',
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
        return 'destructive';
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

  const Icon = getActionIcon(log.action);

  return (
    <Card devId={`log-card-${log.id}`} className="p-4">
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg ${log.success ? 'bg-gray-100' : 'bg-red-100'}`}>
          <Icon className={`h-5 w-5 ${log.success ? 'text-gray-600' : 'text-red-600'}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">
                  {getActionLabel(log.action)}
                </span>
                <Badge 
                  devId={`status-badge-${log.id}`}
                  variant={getActionColor(log.action, log.success)}
                  className="text-xs"
                >
                  {log.success ? 'Success' : 'Failed'}
                </Badge>
              </div>
              {log.error && (
                <p className="text-sm text-red-600 mt-1">{log.error}</p>
              )}
              {log.details && (
                <div className="text-sm text-gray-600 mt-1">
                  {log.action === 'sessions_revoked_all' && log.details.count && (
                    <span>{log.details.count} sessions revoked</span>
                  )}
                  {log.action === 'session_revoked' && log.details.sessionId && (
                    <span>Session ID: {log.details.sessionId.slice(0, 8)}...</span>
                  )}
                </div>
              )}
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                {log.ip && (
                  <span className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    {log.ip}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDate(log.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}