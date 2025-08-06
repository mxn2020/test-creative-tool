// src/components/sessions/OtherSessionsSection.tsx

import React from 'react';
import { Container, Div, H2 } from '@/lib/dev-container';
import { SessionCard } from './SessionCard';

interface OtherSessionsSectionProps {
  sessions: any[];
  onRevoke: (sessionId: string) => void;
  isRevoking: boolean;
  revokingSessionId: string | undefined;
}

export const OtherSessionsSection: React.FC<OtherSessionsSectionProps> = ({
  sessions,
  onRevoke,
  isRevoking,
  revokingSessionId,
}) => {
  const otherSessions = sessions.filter(s => !s.current);

  if (otherSessions.length === 0) return null;

  return (
    <Container componentId="other-sessions-section">
      <Div devId="other-sessions-wrapper" className="space-y-4">
        <H2 devId="other-sessions-title" className="text-xl font-semibold text-gray-900">
          Other Sessions
        </H2>
        <Div devId="other-sessions-list" className="space-y-3">
          {otherSessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onRevoke={onRevoke}
              isRevoking={isRevoking && revokingSessionId === session.id}
            />
          ))}
        </Div>
      </Div>
    </Container>
  );
};