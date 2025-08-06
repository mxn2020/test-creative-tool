import React, { useState, useEffect } from 'react';
import { Container, Div, Card, CardContent, CardHeader } from '../lib/dev-container';
import { useLogin } from '@/hooks/useLogin';
import { Logo } from '@/components/auth/Logo';
import { LoginHeader } from '@/components/auth/login/LoginHeader';
import { LoginSocialButtons } from '@/components/auth/login/LoginSocialButtons';
import { LoginDivider } from '@/components/auth/login/LoginDivider';
import { LoginForm } from '@/components/auth/login/LoginForm';
import { LoginFooter } from '@/components/auth/login/LoginFooter';
import { LoginError } from '@/components/auth/login/LoginError';

// OAuth providers check - temporarily disabled
const checkOAuthProviders = async () => ({ github: false, google: false });

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [providers, setProviders] = useState({ github: false, google: false });
  const { login, loginWithProvider, isLoading, error, setError } = useLogin();

  useEffect(() => {
    const loadProviders = async () => {
      const providerStatus = await checkOAuthProviders();
      setProviders(providerStatus);
    };
    loadProviders();
  }, []);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    login({ email, password });
  };

  const handleGoogleLogin = () => {
    setError(null);
    loginWithProvider('google');
  };

  const handleGithubLogin = () => {
    setError(null);
    loginWithProvider('github');
  };

  return (
    <Container componentId="login-page">
      <Div devId="login-page-wrapper" className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Div devId="login-content-wrapper" className="w-full max-w-md space-y-8">
          <Logo logoIconId="login-page-logo-icon" />
          <Card devId="login-card">
            <CardHeader devId="login-card-header" className="space-y-1">
              <LoginHeader />
            </CardHeader>
          <CardContent devId="login-card-content" className="space-y-4">
            {/* Error Alert */}
            <LoginError error={error} />

            {/* Social Login Buttons */}
            <LoginSocialButtons
              onGoogleLogin={handleGoogleLogin}
              onGithubLogin={handleGithubLogin}
              isLoading={isLoading}
              providers={providers}
            />

            {/* Divider */}
            <LoginDivider />

            {/* Login Form */}
            <LoginForm
              email={email}
              password={password}
              isLoading={isLoading}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onSubmit={handleEmailLogin}
            />

            {/* Footer */}
            <LoginFooter />
          </CardContent>
          </Card>
        </Div>
      </Div>
    </Container>
  );
};