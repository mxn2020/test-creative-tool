// src/components/users/details/UserSessions.tsx

import { Card, Button, Badge } from '@/lib/dev-container';
import { Monitor, Smartphone, Globe, Clock } from 'lucide-react';

interface Session {
  id: string;
  active: boolean;
  createdAt: string;
  expiresAt: string;
  userAgent: string;
  ip: string;
}

interface UserSessionsProps {
  sessions: Session[];
  currentSessionId?: string;
  onTerminateSession?: (sessionId: string) => void;
}

export function UserSessions({ sessions, currentSessionId, onTerminateSession }: UserSessionsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDeviceIcon = (userAgent: string) => {
    if (userAgent.toLowerCase().includes('mobile')) return <Smartphone className="h-4 w-4" />;
    return <Monitor className="h-4 w-4" />;
  };

  const getBrowserName = (userAgent: string) => {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown Browser';
  };

  return (
    <Card devId="user-sessions-card" className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Globe className="h-5 w-5" />
        Active Sessions
      </h3>

      {sessions.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No active sessions</p>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <div 
              key={session.id} 
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <div className="text-gray-600 mt-1">
                  {getDeviceIcon(session.userAgent)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900">
                      {getBrowserName(session.userAgent)}
                    </p>
                    {session.id === currentSessionId && (
                      <Badge devId="current-session-badge" variant="outline" className="text-xs">
                        Current
                      </Badge>
                    )}
                    {session.active && (
                      <Badge devId="active-session-badge" variant="default" className="text-xs">
                        Active
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">IP: {session.ip}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Started: {formatDate(session.createdAt)}
                    </span>
                    <span>Expires: {formatDate(session.expiresAt)}</span>
                  </div>
                </div>
              </div>
              {onTerminateSession && session.id !== currentSessionId && (
                <Button
                  devId="terminate-session-button"
                  variant="outline"
                  size="sm"
                  onClick={() => onTerminateSession(session.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Terminate
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}