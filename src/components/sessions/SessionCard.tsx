import { Card, Button, Badge } from '../../lib/dev-container';
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  Globe, 
  Clock 
} from 'lucide-react';
import type { Session } from '../../lib/api/sessions';

interface SessionCardProps {
  session: Session;
  onRevoke?: (sessionId: string) => void;
  isRevoking?: boolean;
  isCurrent?: boolean;
}

export function SessionCard({ session, onRevoke, isRevoking, isCurrent }: SessionCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h remaining`;
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'mobile':
        return Smartphone;
      case 'tablet':
        return Tablet;
      default:
        return Monitor;
    }
  };

  const Icon = getDeviceIcon(session.device);
  const cardClass = isCurrent ? 'p-6 border-green-200 bg-green-50' : 'p-6';

  return (
    <Card devId={`session-card-${session.id}`} className={cardClass}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${isCurrent ? 'bg-green-100' : 'bg-gray-100'}`}>
            <Icon className={`h-6 w-6 ${isCurrent ? 'text-green-600' : 'text-gray-600'}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">
                {session.device} - {session.browser}
              </h3>
              {isCurrent && (
                <Badge devId="current-badge" variant="outline" className="text-green-700 border-green-300">
                  Current
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">{session.os}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {session.ipAddress}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {getTimeRemaining(session.expiresAt)}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {isCurrent ? 'Signed in' : 'Last active'} {formatDate(isCurrent ? session.createdAt : session.updatedAt)}
            </p>
          </div>
        </div>
        {!isCurrent && onRevoke && (
          <Button
            devId={`revoke-button-${session.id}`}
            variant="outline"
            size="sm"
            onClick={() => onRevoke(session.id)}
            disabled={isRevoking}
          >
            {isRevoking ? 'Revoking...' : 'Revoke'}
          </Button>
        )}
      </div>
    </Card>
  );
}