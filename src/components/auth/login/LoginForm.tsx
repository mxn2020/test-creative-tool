// src/components/auth/login/LoginForm.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Button, Container, Div, Input, Label } from '@/lib/dev-container';

interface LoginFormProps {
  email: string;
  password: string;
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => {
  return (
    <Container componentId="login-form">
      <form onSubmit={onSubmit} className="space-y-4">
        <Div devId="email-field-wrapper" className="space-y-2">
          <Label devId="email-label" htmlFor="email">Email</Label>
          <Input
            devId="email-input"
            id="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={isLoading}
          />
        </Div>
        <Div devId="password-field-wrapper" className="space-y-2">
          <Div devId="password-label-row" className="flex items-center justify-between">
            <Label devId="password-label" htmlFor="password">Password</Label>
            <Link 
              to="/forgot-password" 
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </Div>
          <Input
            devId="password-input"
            id="password"
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder="Enter your password"
            required
            disabled={isLoading}
          />
        </Div>
        <Button
          devId="login-submit-button"
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
    </Container>
  );
};