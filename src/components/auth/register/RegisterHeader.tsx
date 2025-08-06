// src/components/auth/register/RegisterHeader.tsx

import React from 'react';
import { CardDescription, CardTitle, Container } from '@/lib/dev-container';

export const RegisterHeader: React.FC = () => {
  return (
    <Container componentId="register-header">
      <CardTitle devId="register-header-title" className="text-2xl text-center">Create an account</CardTitle>
      <CardDescription devId="register-header-description" className="text-center">
        Enter your information to create a new account
      </CardDescription>
    </Container>
  );
};