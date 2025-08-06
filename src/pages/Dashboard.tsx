import React from 'react';
import { Container, Div, H2, P } from '@/lib/dev-container';
export const DashboardStats: React.FC = () => {
  return (
    <Container componentId="dashboard-stats">
      <Div devId="dashboard-stats-wrapper" className="p-4 bg-white rounded shadow">
        <H2 className="text-lg font-semibold mb-2">Business Metrics</H2>
        <P className="text-gray-600">Statistics and key performance indicators will appear here.</P>
      </Div>
    </Container>
  );
};
---END:src/components/dashboard/DashboardStats.tsx---
---FILE:src/components/dashboard/DashboardWidget.tsx---
import React from 'react';
import { Container, Div, H2, P } from '@/lib/dev-container';
export const DashboardWidget: React.FC = () => {
  return (
    <Container componentId="dashboard-widget">
      <Div devId="dashboard-widget-wrapper" className="p-4 bg-white rounded shadow">
        <H2 className="text-lg font-semibold mb-2">Widget</H2>
        <P className="text-gray-600">Additional business widget content goes here.</P>
      </Div>
    </Container>
  );
};
---END:src/components/dashboard/DashboardWidget.tsx---
---FILE:src/pages/Dashboard.tsx---
import React from 'react';
import { Container, Div } from '../lib/dev-container';
import { useDashboard } from '@/hooks/useDashboard';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { ProfileCard } from '@/components/dashboard/ProfileCard';
import { WelcomeCard } from '@/components/dashboard/WelcomeCard';
import { SessionWarning } from '@/components/dashboard/SessionWarning';
import { CurrentSessionCard } from '@/components/dashboard/CurrentSessionCard';
import { RecentActivityCard } from '@/components/dashboard/RecentActivityCard';
import { DashboardLoading } from '@/components/dashboard/DashboardLoading';
import { DashboardUnauthorized } from '@/components/dashboard/DashboardUnauthorized';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { DashboardWidget } from '@/components/dashboard/DashboardWidget';
export const Dashboard: React.FC = () => {
  const {
    session,
    sessionLoading,
    currentSession,
    multipleSessions,
    getUserInitials,
    getTimeRemaining,
    getDaysSinceMember,
  } = useDashboard();
  if (sessionLoading) {
    return <DashboardLoading />;
  }
  if (!session) {
    return <DashboardUnauthorized />;
  }
  const user = session.user;
  if (!user) {
    return <DashboardUnauthorized isError errorMessage="Error: User data missing." />;
  }
  return (
    <Container componentId="dashboard-page">
      <Div devId="dashboard-page-wrapper" className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <Container componentId="dashboard-content">
          <Div devId="dashboard-content-wrapper" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Div devId="dashboard-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProfileCard user={user} getUserInitials={getUserInitials} />
              <Container componentId="dashboard-stats">
                <Div devId="dashboard-stats-wrapper" className="md:col-span-2 space-y-6">
                  <WelcomeCard userName={user.name} daysSinceMember={getDaysSinceMember(user.createdAt)} />
                  <SessionWarning multipleSessions={multipleSessions} />
                  <CurrentSessionCard currentSession={currentSession} getTimeRemaining={getTimeRemaining} />
                  <RecentActivityCard />
                  {/* New business widgets */}
                  <DashboardStats />
                  <DashboardWidget />
                </Div>
              </Container>
            </Div>
          </Div>
        </Container>
      </Div>
    </Container>
  );
};
---END:src/pages/Dashboard.tsx---
---END---