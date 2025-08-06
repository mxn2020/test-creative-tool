// src/pages/ForgotPassword.tsx

import React, { useState } from 'react';
import { Container, Card, CardContent, CardHeader, Div } from '../lib/dev-container';
import { useForgotPassword } from '@/hooks/useForgotPassword';
import { Logo } from '@/components/auth/Logo';
import { ForgotPasswordHeader } from '@/components/auth/forgot-password/ForgotPasswordHeader';
import { ForgotPasswordForm } from '@/components/auth/forgot-password/ForgotPasswordForm';
import { ForgotPasswordFooter } from '@/components/auth/forgot-password/ForgotPasswordFooter';
import { ForgotPasswordSuccess } from '@/components/auth/forgot-password/ForgotPasswordSuccess';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const { sendResetEmail, isLoading, error, submitted } = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sendResetEmail(email);
  };

  if (submitted) {
    return <ForgotPasswordSuccess email={email} />;
  }

  return (
    <Container componentId="forgot-password-page">
      <Div devId="forgot-password-wrapper" className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Div devId="forgot-password-content-wrapper" className="w-full max-w-md space-y-8">
          <Logo logoIconId="forgot-password-page-logo-icon" />
          <Card devId="forgot-password-card">
            <CardHeader devId="forgot-password-card-header" className="space-y-1">
              <ForgotPasswordHeader />
            </CardHeader>
            <CardContent devId="forgot-password-card-content" className="space-y-4">
              <ForgotPasswordForm
                email={email}
                isLoading={isLoading}
                error={error}
                onEmailChange={setEmail}
                onSubmit={handleSubmit}
              />
              {/* Footer */}
              <ForgotPasswordFooter />
            </CardContent>
          </Card>
        </Div>
      </Div>
    </Container>
  );
};