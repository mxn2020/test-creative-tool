// src/components/sessions/SessionsHeader.tsx

import React from 'react';
import { Container, Div, H1, P } from '@/lib/dev-container';

export const SessionsHeader: React.FC = () => {
  return (
    <Container componentId="sessions-header">
      <Div devId="header-content">
        <H1 devId="header-title" className="text-3xl font-bold text-gray-900">Active Sessions</H1>
        <P devId="header-description" className="text-gray-600 mt-1">
          Manage your active sessions and enhance your account security
        </P>
      </Div>
    </Container>
  );
};