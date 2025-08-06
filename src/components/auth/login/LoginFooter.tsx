// src/components/auth/login/LoginFooter.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Div, Span } from '@/lib/dev-container';

export const LoginFooter: React.FC = () => {
  return (
    <Container componentId="login-footer">
      <Div devId="login-footer-text" className="text-center text-sm">
        <Span devId="login-footer-prefix" className="text-muted-foreground">
          Don't have an account?{' '}
        </Span>
        <Link 
          to="/register" 
          className="text-primary hover:underline font-medium"
        >
          Sign up
        </Link>
      </Div>
    </Container>
  );
};