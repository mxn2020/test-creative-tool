// src/components/dashboard/SessionWarning.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Alert, Button, Div, P } from '@/lib/dev-container';
import { AlertTriangle } from 'lucide-react';

interface SessionWarningProps {
  multipleSessions: boolean;
}

export const SessionWarning: React.FC<SessionWarningProps> = ({ multipleSessions }) => {
  const navigate = useNavigate();

  if (!multipleSessions) return null;

  return (
    <Container componentId="session-warning">
      <Alert devId="multiple-sessions-warning" variant="default" className="border-yellow-200 bg-yellow-50">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <Div devId="warning-content" className="ml-2">
          <P devId="warning-title" className="font-semibold text-yellow-900">Multiple active sessions detected</P>
          <P devId="warning-description" className="text-sm text-yellow-700 mt-1">
            You're signed in on multiple devices. Review your sessions for security.
          </P>
          <Button
            devId="review-sessions-button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => navigate('/sessions')}
          >
            Review Sessions
          </Button>
        </Div>
      </Alert>
    </Container>
  );
};