// src/components/sessions/CurrentSessionSection.tsx

import React from 'react';
import { Container, Div, H2 } from '@/lib/dev-container';
import { SessionCard } from './SessionCard';

interface CurrentSessionSectionProps {
  currentSession: any;
}

export const CurrentSessionSection: React.FC<CurrentSessionSectionProps> = ({ currentSession }) => {
  if (!currentSession) return null;

  return (
    <Container componentId="current-session-section">
      <Div devId="current-session-wrapper" className="space-y-4">
        <H2 devId="current-session-title" className="text-xl font-semibold text-gray-900">
          Current Session
        </H2>
        <SessionCard
          session={currentSession}
          isCurrent={true}
        />
      </Div>
    </Container>
  );
};