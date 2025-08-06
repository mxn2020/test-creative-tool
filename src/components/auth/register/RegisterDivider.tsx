// src/components/auth/register/RegisterDivider.tsx

import React from 'react';
import { Container, Div, Span } from '@/lib/dev-container';

export const RegisterDivider: React.FC = () => {
  return (
    <Container componentId="register-divider">
      <Div devId="register-divider-wrapper" className="relative">
        <Div devId="register-divider-line" className="absolute inset-0 flex items-center">
          <Span devId="register-divider-border" className="w-full border-t" />
        </Div>
        <Div devId="register-divider-text-wrapper" className="relative flex justify-center text-xs uppercase">
          <Span devId="register-divider-text" className="bg-white px-2 text-muted-foreground">
            Or continue with
          </Span>
        </Div>
      </Div>
    </Container>
  );
};