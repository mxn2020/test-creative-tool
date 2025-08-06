import { Card, Button } from '../../lib/dev-container';
import { Shield, LogOut } from 'lucide-react';

interface SessionSecurityStatusProps {
  activeSessionsCount: number;
  onRevokeAll: () => void;
  isRevokingAll: boolean;
}

export function SessionSecurityStatus({ 
  activeSessionsCount, 
  onRevokeAll, 
  isRevokingAll 
}: SessionSecurityStatusProps) {
  return (
    <Card devId="security-overview" className="p-6 bg-blue-50 border-blue-200">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Shield className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-blue-900">Security Status</h3>
          <p className="text-sm text-blue-700 mt-1">
            You have {activeSessionsCount} active session{activeSessionsCount !== 1 ? 's' : ''}.
            {activeSessionsCount > 3 && ' Consider reviewing and revoking unused sessions.'}
          </p>
          {activeSessionsCount > 1 && (
            <Button
              devId="revoke-all-button"
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={onRevokeAll}
              disabled={isRevokingAll}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out all other sessions
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}