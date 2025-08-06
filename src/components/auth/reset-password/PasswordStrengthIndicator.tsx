// src/components/auth/reset-password/PasswordStrengthIndicator.tsx

import React from 'react';
import { Check, X } from 'lucide-react';
import { Progress, Div, Span } from '@/lib/dev-container';

interface PasswordStrengthIndicatorProps {
  password: string;
  passwordStrength: number;
  passwordChecks: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
  passwordStrength,
  passwordChecks,
}) => {
  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return 'bg-red-500';
    if (passwordStrength < 60) return 'bg-orange-500';
    if (passwordStrength < 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 40) return 'Weak';
    if (passwordStrength < 60) return 'Fair';
    if (passwordStrength < 80) return 'Good';
    return 'Strong';
  };

  if (!password) return null;

  return (
    <Div devId="password-strength-container" className="space-y-3">
      <Div devId="password-strength-bar" className="space-y-1">
        <Div devId="strength-label-row" className="flex justify-between items-center">
          <Span devId="strength-label" className="text-sm text-muted-foreground">Password strength</Span>
          <Span devId="strength-text" className={`text-sm font-medium ${getPasswordStrengthColor().replace('bg-', 'text-')}`}>
            {getPasswordStrengthText()}
          </Span>
        </Div>
        <Progress 
          devId="strength-progress"
          value={passwordStrength} 
          className="h-2" 
        />
      </Div>
      
      <Div devId="password-requirements" className="space-y-2 text-sm">
        <Div devId="length-check" className="flex items-center gap-2">
          {passwordChecks.length ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <X className="h-4 w-4 text-gray-400" />
          )}
          <Span devId="length-text" className={passwordChecks.length ? 'text-green-600' : 'text-gray-500'}>
            At least 8 characters
          </Span>
        </Div>
        
        <Div devId="uppercase-check" className="flex items-center gap-2">
          {passwordChecks.uppercase ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <X className="h-4 w-4 text-gray-400" />
          )}
          <Span devId="uppercase-text" className={passwordChecks.uppercase ? 'text-green-600' : 'text-gray-500'}>
            One uppercase letter
          </Span>
        </Div>
        
        <Div devId="lowercase-check" className="flex items-center gap-2">
          {passwordChecks.lowercase ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <X className="h-4 w-4 text-gray-400" />
          )}
          <Span devId="lowercase-text" className={passwordChecks.lowercase ? 'text-green-600' : 'text-gray-500'}>
            One lowercase letter
          </Span>
        </Div>
        
        <Div devId="number-check" className="flex items-center gap-2">
          {passwordChecks.number ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <X className="h-4 w-4 text-gray-400" />
          )}
          <Span devId="number-text" className={passwordChecks.number ? 'text-green-600' : 'text-gray-500'}>
            One number
          </Span>
        </Div>
        
        <Div devId="special-check" className="flex items-center gap-2">
          {passwordChecks.special ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <X className="h-4 w-4 text-gray-400" />
          )}
          <Span devId="special-text" className={passwordChecks.special ? 'text-green-600' : 'text-gray-500'}>
            One special character
          </Span>
        </Div>
      </Div>
    </Div>
  );
};