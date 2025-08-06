// src/components/users/details/UserDetailsLoadingState.tsx

import React from 'react';
import { Container, Card, Div, P } from '@/lib/dev-container';

export const UserDetailsLoadingState: React.FC = () => {
  return (
    <Container componentId="user-details-loading" className="space-y-6">
      <Card devId="loading-card" className="p-8">
        <Div devId="loading-content" className="flex flex-col items-center justify-center space-y-4">
          <Div devId="loading-spinner" className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></Div>
          <P devId="loading-text" className="text-gray-600">Loading user details...</P>
        </Div>
      </Card>
    </Container>
  );
};