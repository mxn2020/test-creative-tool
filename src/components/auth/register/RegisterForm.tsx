// src/components/auth/register/RegisterForm.tsx

import React from 'react';
import { Loader2 } from 'lucide-react';
import { Button, Container, Div, Input, Label } from '@/lib/dev-container';

interface RegisterFormProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  name,
  email,
  password,
  confirmPassword,
  isLoading,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}) => {
  return (
    <Container componentId="register-form">
      <form onSubmit={onSubmit} className="space-y-4">
        <Div devId="name-field-wrapper" className="space-y-2">
          <Label devId="name-label" htmlFor="name">Full Name</Label>
          <Input
            devId="name-input"
            id="name"
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Enter your full name"
            required
            disabled={isLoading}
          />
        </Div>
        <Div devId="register-email-field-wrapper" className="space-y-2">
          <Label devId="register-email-label" htmlFor="email">Email</Label>
          <Input
            devId="register-email-input"
            id="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={isLoading}
          />
        </Div>
        <Div devId="register-password-field-wrapper" className="space-y-2">
          <Label devId="register-password-label" htmlFor="password">Password</Label>
          <Input
            devId="register-password-input"
            id="password"
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder="Enter your password"
            required
            disabled={isLoading}
          />
        </Div>
        <Div devId="confirm-password-field-wrapper" className="space-y-2">
          <Label devId="confirm-password-label" htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            devId="confirm-password-input"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
            placeholder="Confirm your password"
            required
            disabled={isLoading}
          />
        </Div>
        <Button
          devId="register-submit-button"
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            'Create account'
          )}
        </Button>
      </form>
    </Container>
  );
};