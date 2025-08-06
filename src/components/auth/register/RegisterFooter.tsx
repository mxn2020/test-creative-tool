// src/components/auth/register/RegisterFooter.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Div, Span } from '@/lib/dev-container';

export const RegisterFooter: React.FC = () => {
  return (
    <Container componentId="register-footer">
      <Div devId="register-footer-text" className="text-center text-sm">
        <Span devId="register-footer-prefix" className="text-muted-foreground">
          Already have an account?{' '}
        </Span>
        <Link 
          to="/login" 
          className="text-primary hover:underline font-medium"
        >
          Sign in
        </Link>
      </Div>
    </Container>
  );
};