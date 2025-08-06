// src/components/admin/stats/AdminRecentActivity.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Div, P, Span } from '@/lib/dev-container';
import {
  Clock,
  Activity,
  UserPlus,
  FileEdit,
  MessageSquare,
} from 'lucide-react';

interface ActivityItem {
  type: string;
  description: string;
  timestamp: string;
  color: string;
}

interface AdminRecentActivityProps {
  activities: ActivityItem[];
}

export const AdminRecentActivity: React.FC<AdminRecentActivityProps> = ({ activities }) => {
  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now.getTime() - time.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registration':
        return UserPlus;
      case 'post_created':
        return FileEdit;
      case 'comment_added':
        return MessageSquare;
      default:
        return Activity;
    }
  };

  return (
    <Card 
      devId="admin-recent-activity-card"
      devName="Admin Recent Activity Card"
      devDescription="Card displaying recent system activity"
    >
      <CardHeader 
        devId="admin-recent-activity-header"
        devName="Admin Recent Activity Header"
        devDescription="Header for recent activity card"
      >
        <CardTitle 
          devId="admin-recent-activity-title"
          devName="Admin Recent Activity Title"
          devDescription="Title for recent activity section"
          className="flex items-center gap-2"
        >
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent 
        devId="admin-recent-activity-content"
        devName="Admin Recent Activity Content"
        devDescription="Content area for recent activity list"
      >
        <Div 
          devId="admin-recent-activity-list"
          devName="Admin Recent Activity List"
          devDescription="List container for recent activities"
          className="space-y-3"
        >
          {activities.length === 0 ? (
            <P 
              devId="admin-no-recent-activity"
              devName="Admin No Recent Activity Message"
              devDescription="Message displayed when no recent activity exists"
              className="text-sm text-gray-500"
            >
              No recent activity
            </P>
          ) : (
            activities.slice(0, 5).map((activity, index) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <Div 
                  key={index} 
                  devId={`admin-activity-item-${index}`}
                  devName={`Admin Activity Item ${index}`}
                  devDescription={`Recent activity item: ${activity.description}`}
                  className="flex items-center justify-between py-2 border-b"
                >
                  <Div 
                    devId={`admin-activity-content-${index}`}
                    devName={`Admin Activity Content ${index}`}
                    devDescription={`Content for activity item ${index}`}
                    className="flex items-center gap-3"
                  >
                    <Div 
                      devId={`admin-activity-icon-${index}`}
                      devName={`Admin Activity Icon ${index}`}
                      devDescription={`Icon for activity item ${index}`}
                      className={`w-8 h-8 rounded-full bg-${activity.color}-100 flex items-center justify-center`}
                    >
                      <Icon className={`h-4 w-4 text-${activity.color}-600`} />
                    </Div>
                    <Span 
                      devId={`admin-activity-description-${index}`}
                      devName={`Admin Activity Description ${index}`}
                      devDescription={`Description for activity item ${index}`}
                      className="text-sm"
                    >
                      {activity.description}
                    </Span>
                  </Div>
                  <Span 
                    devId={`admin-activity-timestamp-${index}`}
                    devName={`Admin Activity Timestamp ${index}`}
                    devDescription={`Timestamp for activity item ${index}`}
                    className="text-sm text-gray-500"
                  >
                    {formatTimeAgo(activity.timestamp)}
                  </Span>
                </Div>
              );
            })
          )}
        </Div>
      </CardContent>
    </Card>
  );
};