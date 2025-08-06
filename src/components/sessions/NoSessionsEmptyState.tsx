// src/components/sessions/NoSessionsEmptyState.tsx

import React from 'react';
import { Container, Card, Div, P } from '@/lib/dev-container';
import { Shield } from 'lucide-react';

interface NoSessionsEmptyStateProps {
  hasOtherSessions: boolean;
}

export const NoSessionsEmptyState: React.FC<NoSessionsEmptyStateProps> = ({ hasOtherSessions }) => {
  if (hasOtherSessions) return null;

  return (
    <Container componentId="no-sessions-empty-state">
      <Card devId="no-sessions-card" className="p-8 text-center">
        <Div devId="empty-state-content" className="flex flex-col items-center">
          <Div devId="empty-state-icon" className="p-4 bg-gray-100 rounded-full mb-4">
            <Shield className="h-8 w-8 text-gray-400" />
          </Div>
          <P devId="empty-state-title" className="text-gray-600">No other active sessions</P>
          <P devId="empty-state-description" className="text-sm text-gray-500 mt-1">
            You're only signed in on this device
          </P>
        </Div>
      </Card>
    </Container>
  );
};