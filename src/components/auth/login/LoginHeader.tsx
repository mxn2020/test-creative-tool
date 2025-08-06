// src/components/auth/login/LoginHeader.tsx

import React from 'react';
import { CardDescription, CardTitle, Container } from '@/lib/dev-container';

export const LoginHeader: React.FC = () => {
  return (
    <Container componentId="login-header">
      <CardTitle devId='login-header-title' className="text-2xl text-center">Welcome back</CardTitle>
      <CardDescription devId='login-header-description' className="text-center">
        Enter your email and password to sign in to your account
      </CardDescription>
    </Container>
  );
};