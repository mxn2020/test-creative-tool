// src/components/auth/forgot-password/ForgotPasswordFooter.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Div, Span } from '@/lib/dev-container';

export const ForgotPasswordFooter: React.FC = () => {
  return (
    <Div devId="forgot-password-footer" className="flex justify-center text-sm">
      <Span devId="forgot-password-footer-text" className="text-muted-foreground">Remember your password? </Span>
      <Link to="/login" className="text-primary hover:underline ml-1">
        Sign in
      </Link>
    </Div>
  );
};