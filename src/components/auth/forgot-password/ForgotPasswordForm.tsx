// src/components/auth/forgot-password/ForgotPasswordForm.tsx

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button, Input, Label, Alert, AlertDescription, Div } from '@/lib/dev-container';

interface ForgotPasswordFormProps {
  email: string;
  isLoading: boolean;
  error: string | null;
  onEmailChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  email,
  isLoading,
  error,
  onEmailChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      {error && (
        <Alert devId="forgot-password-error-alert" variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription devId='forgot-password-error-text'>{error}</AlertDescription>
        </Alert>
      )}
      <Div devId="email-field-wrapper" className="space-y-2">
        <Label devId="forgot-password-email-label" htmlFor="email">Email address</Label>
        <Input
          devId="forgot-password-email-input"
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
          autoComplete="email"
          disabled={isLoading}
        />
      </Div>
      <Button 
        devId="forgot-password-submit-button"
        type="submit" 
        className="w-full mt-6" 
        disabled={isLoading || !email}
      >
        {isLoading ? 'Sending...' : 'Send reset link'}
      </Button>
    </form>
  );
};