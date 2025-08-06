// src/components/auth/reset-password/ResetPasswordHeader.tsx

import React from 'react';
import { KeyRound } from 'lucide-react';
import { CardDescription, CardTitle, Div } from '@/lib/dev-container';

export const ResetPasswordHeader: React.FC = () => {
  return (
    <>
      <Div devId="reset-password-icon-wrapper" className="mx-auto mb-4 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
        <KeyRound className="h-6 w-6 text-blue-600" />
      </Div>
      <CardTitle devId="reset-password-title" className="text-2xl">Reset your password</CardTitle>
      <CardDescription devId="reset-password-description">
        Enter a new password for your account. Make sure it's strong and unique.
      </CardDescription>
    </>
  );
};