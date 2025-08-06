// src/components/sessions/SessionsErrorAlert.tsx

import React from 'react';
import { Container, Alert, Span } from '@/lib/dev-container';
import { AlertCircle } from 'lucide-react';

interface SessionsErrorAlertProps {
  error: string;
}

export const SessionsErrorAlert: React.FC<SessionsErrorAlertProps> = ({ error }) => {
  return (
    <Container componentId="sessions-error-alert">
      <Alert devId="error-alert" variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <Span devId="error-text" className="ml-2">{error}</Span>
      </Alert>
    </Container>
  );
};