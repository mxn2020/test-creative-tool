// src /components/users/details/UserActivity.tsx

import { Card } from '@/lib/dev-container';
import { Activity, Clock, MapPin, Monitor } from 'lucide-react';

interface ActivityItem {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  ip: string;
}

interface UserActivityProps {
  activities: ActivityItem[];
}

export function UserActivity({ activities }: UserActivityProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  const getActionIcon = (action: string) => {
    if (action.includes('login')) return <Monitor className="h-4 w-4" />;
    if (action.includes('update')) return <Activity className="h-4 w-4" />;
    return <Clock className="h-4 w-4" />;
  };

  const getActionColor = (action: string) => {
    if (action.includes('login')) return 'text-green-600';
    if (action.includes('delete')) return 'text-red-600';
    if (action.includes('update')) return 'text-blue-600';
    return 'text-gray-600';
  };

  return (
    <Card devId="user-activity-card" className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Activity className="h-5 w-5" />
        Recent Activity
      </h3>

      {activities.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No recent activity</p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className={`mt-1 ${getActionColor(activity.action)}`}>
                {getActionIcon(activity.action)}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.action}</p>
                {activity.details && (
                  <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                )}
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(activity.timestamp)}
                  </span>
                  {activity.ip && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {activity.ip}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}