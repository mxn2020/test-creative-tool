// src/components/admin/stats/AdminErrorState.tsx

import React from 'react';
import { Container, Div, P } from '@/lib/dev-container';

interface AdminErrorStateProps {
  error: string | null;
}

export const AdminErrorState: React.FC<AdminErrorStateProps> = ({ error }) => {
  return (
    <Container componentId="admin-dashboard-error">
      <Div 
        devId="admin-error-container"
        devName="Admin Error Container"
        devDescription="Container for admin dashboard error state"
        className="flex items-center justify-center h-64"
      >
        <Div 
          devId="admin-error-content"
          devName="Admin Error Content"
          devDescription="Content area for error message"
          className="text-center"
        >
          <P 
            devId="admin-error-message"
            devName="Admin Error Message"
            devDescription="Error message text for admin dashboard"
            className="text-red-600"
          >
            {error || 'Failed to load dashboard'}
          </P>
        </Div>
      </Div>
    </Container>
  );
};