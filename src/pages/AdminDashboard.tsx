import React from 'react';
import { Container, Div, H1, P } from '../lib/dev-container';
import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import { AdminStatsCards } from '@/components/admin/stats/AdminStatsCards';
import { AdminQuickActions } from '@/components/admin/stats/AdminQuickActions';
import { AdminRecentActivity } from '@/components/admin/stats/AdminRecentActivity';
import { AdminSystemHealth } from '@/components/admin/stats/AdminSystemHealth';
import { AdminLoadingState } from '@/components/admin/stats/AdminLoadingState';
import { AdminErrorState } from '@/components/admin/stats/AdminErrorState';
import { AdminClientStats } from '@/components/admin/stats/AdminClientStats';
import { AdminAppointmentStats } from '@/components/admin/stats/AdminAppointmentStats';

export const AdminDashboard: React.FC = () => {
  const { data: stats, isLoading, error } = useAdminDashboard();

  if (isLoading) {
    return <AdminLoadingState />;
  }

  if (error || !stats) {
    return (
      <AdminErrorState
        error={error instanceof Error ? error.message : 'Failed to load admin dashboard'}
      />
    );
  }

  return (
    <Container componentId="admin-dashboard-page">
      <Div devId="admin-dashboard-wrapper" className="space-y-6">
        <Div devId="admin-dashboard-header" className="space-y-2">
          <H1 className="text-2xl font-bold text-gray-900">Admin Dashboard</H1>
          <P className="text-gray-600">System activity, user statistics, and business insights.</P>
        </Div>

        <AdminStatsCards stats={stats} />
        <AdminQuickActions />
        <AdminClientStats clientStats={stats.clientStats} />
        <AdminAppointmentStats appointmentStats={stats.appointmentStats} />
        <AdminRecentActivity activities={stats.recentActivities} />
        <AdminSystemHealth systemHealth={stats.systemHealth} />
      </Div>
    </Container>
  );
};