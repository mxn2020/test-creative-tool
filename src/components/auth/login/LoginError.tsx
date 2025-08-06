// src/components/auth/login/LoginError.tsx

import React from 'react';
import { Alert, AlertDescription, Container } from '@/lib/dev-container';

interface LoginErrorProps {
  error: string | null;
}

export const LoginError: React.FC<LoginErrorProps> = ({ error }) => {
  if (!error) return null;

  return (
    <Container componentId="login-error">
      <Alert devId="login-error-alert" variant="destructive">
        <AlertDescription devId="login-error-description">{error}</AlertDescription>
      </Alert>
    </Container>
  );
};