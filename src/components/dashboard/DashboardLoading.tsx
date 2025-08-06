// src/components/dashboard/DashboardLoading.tsx

import React from 'react';
import { Container, Div, P } from '@/lib/dev-container';

export const DashboardLoading: React.FC = () => {
  return (
    <Container componentId="dashboard-loading">
      <Div devId="loading-wrapper" className="min-h-screen flex items-center justify-center">
        <Div devId="loading-content" className="text-center">
          <Div devId="loading-spinner" className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></Div>
          <P devId="loading-text" className="text-muted-foreground">Loading your dashboard...</P>
        </Div>
      </Div>
    </Container>
  );
};