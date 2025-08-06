// src/components/auth/register/RegisterError.tsx

import React from 'react';
import { Alert, AlertDescription, Container } from '@/lib/dev-container';

interface RegisterErrorProps {
  error: string | null;
}

export const RegisterError: React.FC<RegisterErrorProps> = ({ error }) => {
  if (!error) return null;

  return (
    <Container componentId="register-error">
      <Alert devId="register-error-alert" variant="destructive">
        <AlertDescription devId="register-error-description">{error}</AlertDescription>
      </Alert>
    </Container>
  );
};