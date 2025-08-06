// src/pages/AdminDashboard.tsx

import React from 'react';
import { Container, Div, H1, P } from '../lib/dev-container';
import { useAdminDashboard } from '../hooks/useAdminDashboard';
import { AdminStatsCards } from '@/components/admin/stats/AdminStatsCards';
import { AdminQuickActions } from '@/components/admin/stats/AdminQuickActions';
import { AdminRecentActivity } from '@/components/admin/stats/AdminRecentActivity';
import { AdminSystemHealth } from '@/components/admin/stats/AdminSystemHealth';
import { AdminLoadingState } from '@/components/admin/stats/AdminLoadingState';
import { AdminErrorState } from '@/components/admin/stats/AdminErrorState';

export const AdminDashboard: React.FC = () => {
  const { data: stats, isLoading, error } = useAdminDashboard();

  if (isLoading) {
    return <AdminLoadingState />;
  }

  if (error || !stats) {
    return <AdminErrorState error={error instanceof Error ? error.message : 'Failed to load dashboard statistics'} />;
  }

  return (
    <Container componentId="admin-dashboard-page">
      <Div 
        devId="admin-dashboard-wrapper" 
        devName="Admin Dashboard Wrapper" 
        devDescription="Main wrapper for admin dashboard content"
        className="space-y-6"
      >
        {/* Header */}
        <Div 
          devId="admin-dashboard-header" 
          devName="Admin Dashboard Header" 
          devDescription="Dashboard title and description"
        >
          <H1 
            devId="admin-dashboard-title" 
            devName="Admin Dashboard Title" 
            devDescription="Main admin dashboard title"
            className="text-2xl font-bold text-gray-900"
          >
            Admin Dashboard
          </H1>
          <P 
            devId="admin-dashboard-description" 
            devName="Admin Dashboard Description" 
            devDescription="Dashboard overview description"
            className="text-gray-600 mt-1"
          >
            Overview of system activity and user statistics
          </P>
        </Div>

        {/* Stats Cards */}
        <AdminStatsCards stats={stats} />

        {/* Quick Actions */}
        <AdminQuickActions />

        {/* Recent Activity */}
        <AdminRecentActivity activities={stats.recentActivities} />

        {/* System Health */}
        <AdminSystemHealth systemHealth={stats.systemHealth} />
      </Div>
    </Container>
  );
};

