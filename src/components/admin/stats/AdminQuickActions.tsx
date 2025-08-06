// src/components/admin/stats/AdminQuickActions.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, Div, H3, P } from '@/lib/dev-container';
import {
  Users,
  FileText,
  Settings,
} from 'lucide-react';

export const AdminQuickActions: React.FC = () => {
  const quickActions = [
    {
      title: 'Manage Users',
      description: 'View and edit user accounts',
      icon: Users,
      color: 'text-blue-600',
      link: '/admin-users',
    },
    {
      title: 'View Logs',
      description: 'Monitor system activity',
      icon: FileText,
      color: 'text-purple-600',
      link: '/admin-audit-logs',
    },
    {
      title: 'System Settings',
      description: 'Configure application',
      icon: Settings,
      color: 'text-gray-600',
      link: '/admin/settings',
    },
  ];

  return (
    <Card 
      devId="admin-quick-actions-card"
      devName="Admin Quick Actions Card"
      devDescription="Card containing quick action buttons for admin tasks"
    >
      <CardHeader 
        devId="admin-quick-actions-header"
        devName="Admin Quick Actions Header"
        devDescription="Header for quick actions card"
      >
        <CardTitle 
          devId="admin-quick-actions-title"
          devName="Admin Quick Actions Title"
          devDescription="Title for quick actions section"
        >
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent 
        devId="admin-quick-actions-content"
        devName="Admin Quick Actions Content"
        devDescription="Content area for quick action buttons"
      >
        <Div 
          devId="admin-quick-actions-grid"
          devName="Admin Quick Actions Grid"
          devDescription="Grid layout for quick action buttons"
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} to={action.link}>
                <Div
                  devId={`admin-quick-action-${index}`}
                  devName={`Admin ${action.title} Quick Action`}
                  devDescription={`Quick action button for ${action.title}`}
                  className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <Icon className={`h-8 w-8 ${action.color} mr-3`} />
                  <Div 
                    devId={`admin-quick-action-content-${index}`}
                    devName={`Admin ${action.title} Action Content`}
                    devDescription={`Content for ${action.title} quick action`}
                  >
                    <H3 
                      devId={`admin-quick-action-title-${index}`}
                      devName={`Admin ${action.title} Action Title`}
                      devDescription={`Title for ${action.title} quick action`}
                      className="font-medium"
                    >
                      {action.title}
                    </H3>
                    <P 
                      devId={`admin-quick-action-description-${index}`}
                      devName={`Admin ${action.title} Action Description`}
                      devDescription={`Description for ${action.title} quick action`}
                      className="text-sm text-gray-600"
                    >
                      {action.description}
                    </P>
                  </Div>
                </Div>
              </Link>
            );
          })}
        </Div>
      </CardContent>
    </Card>
  );
};