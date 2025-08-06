// src/components/users/UsersErrorState.tsx

import React from 'react';
import { Container, Card, Div, P } from '@/lib/dev-container';
import { AlertCircle } from 'lucide-react';

interface UsersErrorStateProps {
  error: Error;
}

export const UsersErrorState: React.FC<UsersErrorStateProps> = ({ error }) => {
  return (
    <Container componentId="users-error-state">
      <Card devId="error-card" className="bg-red-50 border-red-200 p-4">
        <Div devId="error-content" className="flex items-center gap-2 text-red-700">
          <AlertCircle className="h-5 w-5" />
          <P devId="error-message">{error.message}</P>
        </Div>
      </Card>
    </Container>
  );
};