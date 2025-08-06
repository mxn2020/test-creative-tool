// src/components/auth/login/LoginDivider.tsx

import React from 'react';
import { Container, Div, Span } from '@/lib/dev-container';

export const LoginDivider: React.FC = () => {
  return (
    <Container componentId="login-divider">
      <Div devId="login-divider-wrapper" className="relative">
        <Div devId="login-divider-line" className="absolute inset-0 flex items-center">
          <Span devId="divider-border" className="w-full border-t" />
        </Div>
        <Div devId="login-divider-text-wrapper" className="relative flex justify-center text-xs uppercase">
          <Span devId="divider-text" className="bg-white px-2 text-muted-foreground">
            Or continue with
          </Span>
        </Div>
      </Div>
    </Container>
  );
};