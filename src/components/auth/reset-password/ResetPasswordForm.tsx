// src/components/auth/reset-password/ResetPasswordForm.tsx

import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button, Input, Label, Alert, AlertDescription, Div } from '@/lib/dev-container';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';

interface ResetPasswordFormProps {
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  error: string | null;
  passwordStrength: number;
  passwordChecks: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  password,
  confirmPassword,
  isLoading,
  error,
  passwordStrength,
  passwordChecks,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <Alert devId="reset-password-error-alert" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription devId="reset-password-error-description">{error}</AlertDescription>
        </Alert>
      )}
      
      <Div devId="new-password-field" className="space-y-2">
        <Label devId="new-password-label" htmlFor="password">New password</Label>
        <Div devId="password-input-wrapper" className="relative">
          <Input
            devId="new-password-input"
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
            disabled={isLoading}
            className="pr-10"
          />
          <Button
            devId="toggle-password-visibility"
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </Button>
        </Div>
      </Div>

      {/* Password strength indicator */}
      <PasswordStrengthIndicator
        password={password}
        passwordStrength={passwordStrength}
        passwordChecks={passwordChecks}
      />

      <Div devId="confirm-password-field" className="space-y-2">
        <Label devId="confirm-password-label" htmlFor="confirmPassword">Confirm password</Label>
        <Div devId="confirm-password-input-wrapper" className="relative">
          <Input
            devId="confirm-password-input"
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
            required
            disabled={isLoading}
            className="pr-10"
          />
          <Button
            devId="toggle-confirm-password-visibility"
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            tabIndex={-1}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </Button>
        </Div>
      </Div>

      <Button 
        devId="reset-password-submit-button"
        type="submit" 
        className="w-full" 
        disabled={isLoading || !password || !confirmPassword || passwordStrength < 60}
      >
        {isLoading ? 'Resetting...' : 'Reset password'}
      </Button>
    </form>
  );
};