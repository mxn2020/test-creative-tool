// src/components/users/details/UserDetailsErrorState.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Div, P, Button } from '@/lib/dev-container';
import { AlertCircle } from 'lucide-react';

interface UserDetailsErrorStateProps {
  error?: Error | null;
}

export const UserDetailsErrorState: React.FC<UserDetailsErrorStateProps> = ({ error }) => {
  return (
    <Container componentId="user-details-error" className="space-y-6">
      <Card devId="error-card" className="bg-red-50 border-red-200 p-8">
        <Div devId="error-content" className="flex flex-col items-center justify-center space-y-4">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <P devId="error-message" className="text-red-700">
            {error?.message || 'User not found'}
          </P>
          <Link to="/admin/users">
            <Button devId="back-button" variant="outline">
              Back to Users
            </Button>
          </Link>
        </Div>
      </Card>
    </Container>
  );
};