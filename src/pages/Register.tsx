// src/pages/Register.tsx

import React, { useState, useEffect } from 'react';
import { Container, Div, Card, CardContent, CardHeader } from '../lib/dev-container';
import { useRegister } from '@/hooks/useRegister';
import { Logo } from '@/components/auth/Logo';
import { RegisterHeader } from '@/components/auth/register/RegisterHeader';
import { RegisterSocialButtons } from '@/components/auth/register/RegisterSocialButtons';
import { RegisterDivider } from '@/components/auth/register/RegisterDivider';
import { RegisterForm } from '@/components/auth/register/RegisterForm';
import { RegisterFooter } from '@/components/auth/register/RegisterFooter';
import { RegisterError } from '@/components/auth/register/RegisterError';

// OAuth providers check - temporarily disabled
const checkOAuthProviders = async () => ({ github: false, google: false });

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [providers, setProviders] = useState({ github: false, google: false });
  const [validationError, setValidationError] = useState<string | null>(null);
  const { register, registerWithProvider, isLoading, error, setError } = useRegister();

  useEffect(() => {
    const loadProviders = async () => {
      const providerStatus = await checkOAuthProviders();
      setProviders(providerStatus);
    };
    loadProviders();
  }, []);

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setValidationError(null);

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters long');
      return;
    }

    register({ name, email, password });
  };

  const handleGoogleRegister = () => {
    setError(null);
    setValidationError(null);
    registerWithProvider('google');
  };

  const handleGithubRegister = () => {
    setError(null);
    setValidationError(null);
    registerWithProvider('github');
  };

  return (
    <Container componentId="register-page">
      <Div devId="register-page-wrapper" className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Div devId="register-content-wrapper" className="w-full max-w-md space-y-8">
          <Logo logoIconId="register-page-logo-icon" />
          <Card devId="register-card">
            <CardHeader devId="register-card-header" className="space-y-1">
              <RegisterHeader />
            </CardHeader>
          <CardContent devId="register-card-content" className="space-y-4">
            {/* Error Alert */}
            <RegisterError error={error || validationError} />

            {/* Social Register Buttons */}
            <RegisterSocialButtons
              onGoogleRegister={handleGoogleRegister}
              onGithubRegister={handleGithubRegister}
              isLoading={isLoading}
              providers={providers}
            />

            {/* Divider */}
            <RegisterDivider />

            {/* Register Form */}
            <RegisterForm
              name={name}
              email={email}
              password={password}
              confirmPassword={confirmPassword}
              isLoading={isLoading}
              onNameChange={setName}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onConfirmPasswordChange={setConfirmPassword}
              onSubmit={handleEmailRegister}
            />

            {/* Footer */}
            <RegisterFooter />
          </CardContent>
          </Card>
        </Div>
      </Div>
    </Container>
  );
};