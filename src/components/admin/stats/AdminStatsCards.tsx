// src/components/admin/stats/AdminStatsCards.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Div } from '@/lib/dev-container';
import { type AdminStats } from '@/lib/api/admin';
import {
  Users,
  UserCheck,
  FileText,
  MessageSquare,
} from 'lucide-react';

interface AdminStatsCardsProps {
  stats: AdminStats;
}

export const AdminStatsCards: React.FC<AdminStatsCardsProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Users',
      value: stats.users.total,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      subtitle: `${stats.users.verified} verified`,
    },
    {
      title: 'Active Today',
      value: stats.users.active,
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      subtitle: `${stats.users.activeSessions} sessions`,
    },
    {
      title: 'Total Posts',
      value: stats.content.posts,
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      subtitle: `${stats.content.publishedPosts} published`,
    },
    {
      title: 'Comments',
      value: stats.content.comments,
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      subtitle: `${stats.content.recentComments} today`,
    },
  ];

  return (
    <Div 
      devId="admin-stats-cards-container" 
      devName="Admin Stats Cards Container" 
      devDescription="Container for admin dashboard statistics cards"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={index} 
            devId={`admin-stat-card-${index}`}
            devName={`Admin ${stat.title} Stat Card`}
            devDescription={`Statistics card showing ${stat.title}: ${stat.value}`}
          >
            <CardHeader 
              devId={`admin-stat-card-header-${index}`}
              devName={`Admin ${stat.title} Card Header`}
              devDescription={`Header for ${stat.title} statistics card`}
              className="flex flex-row items-center justify-between pb-2"
            >
              <CardTitle 
                devId={`admin-stat-card-title-${index}`}
                devName={`Admin ${stat.title} Card Title`}
                devDescription={`Title for ${stat.title} statistics card`}
                className="text-sm font-medium text-gray-600"
              >
                {stat.title}
              </CardTitle>
              <Div 
                devId={`admin-stat-card-icon-${index}`}
                devName={`Admin ${stat.title} Card Icon`}
                devDescription={`Icon container for ${stat.title} statistics card`}
                className={`p-2 rounded-lg ${stat.bgColor}`}
              >
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </Div>
            </CardHeader>
            <CardContent 
              devId={`admin-stat-card-content-${index}`}
              devName={`Admin ${stat.title} Card Content`}
              devDescription={`Content for ${stat.title} statistics card`}
            >
              <Div 
                devId={`admin-stat-card-value-${index}`}
                devName={`Admin ${stat.title} Card Value`}
                devDescription={`Value display for ${stat.title} statistics`}
                className="text-2xl font-bold"
              >
                {stat.value}
              </Div>
              <Div 
                devId={`admin-stat-card-subtitle-${index}`}
                devName={`Admin ${stat.title} Card Subtitle`}
                devDescription={`Subtitle for ${stat.title} statistics card`}
                className="text-xs text-gray-500 mt-1"
              >
                {stat.subtitle}
              </Div>
            </CardContent>
          </Card>
        );
      })}
    </Div>
  );
};

