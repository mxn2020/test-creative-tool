// src/components/auth/forgot-password/ForgotPasswordHeader.tsx

import React from 'react';
import { CardDescription, CardTitle } from '@/lib/dev-container';

export const ForgotPasswordHeader: React.FC = () => {
  return (
    <>
      <CardTitle devId='forgot-password-header-title' className="text-2xl">Forgot your password?</CardTitle>
      <CardDescription devId='forgot-password-header-description'>
        Enter your email address and we'll send you a link to reset your password.
      </CardDescription>
    </>
  );
};