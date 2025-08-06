import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Card, CardContent, CardHeader, Div } from '../lib/dev-container';
import { useResetPassword } from '@/hooks/useResetPassword';
import { ResetPasswordHeader } from '@/components/auth/reset-password/ResetPasswordHeader';
import { ResetPasswordForm } from '@/components/auth/reset-password/ResetPasswordForm';
import { ResetPasswordSuccess } from '@/components/auth/reset-password/ResetPasswordSuccess';

export const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const {
    resetPassword,
    isLoading,
    error,
    submitted,
    passwordChecks,
    passwordStrength,
    calculatePasswordStrength,
  } = useResetPassword(token);

  useEffect(() => {
    calculatePasswordStrength(password);
  }, [password, calculatePasswordStrength]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    if (passwordStrength < 60) {
      setValidationError('Please choose a stronger password');
      return;
    }

    try {
      resetPassword(password);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  if (submitted) {
    return <ResetPasswordSuccess />;
  }

  return (
    <Container componentId="reset-password-page">
      <Div devId="reset-password-wrapper" className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card devId="reset-password-card" className="w-full max-w-md">
          <CardHeader devId="reset-password-card-header" className="text-center">
            <ResetPasswordHeader />
          </CardHeader>
          <CardContent devId="reset-password-card-content" className="space-y-4">
            <ResetPasswordForm
              password={password}
              confirmPassword={confirmPassword}
              isLoading={isLoading}
              error={error || validationError}
              passwordStrength={passwordStrength}
              passwordChecks={passwordChecks}
              onPasswordChange={setPassword}
              onConfirmPasswordChange={setConfirmPassword}
              onSubmit={handleSubmit}
            />
          </CardContent>
        </Card>
      </Div>
    </Container>
  );
};