// src/hooks/useResetPassword.ts

import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@/lib/auth-client';

interface PasswordStrengthChecks {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}

export function useResetPassword(token: string | null) {
  const [submitted, setSubmitted] = useState(false);
  const [passwordChecks, setPasswordChecks] = useState<PasswordStrengthChecks>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [tokenError, setTokenError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setTokenError('Invalid or missing reset token. Please request a new password reset.');
    }
  }, [token]);

  const calculatePasswordStrength = (password: string) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };
    
    setPasswordChecks(checks);
    
    const strength = Object.values(checks).filter(Boolean).length;
    setPasswordStrength((strength / 5) * 100);
  };

  const mutation = useMutation({
    mutationFn: async ({ password, token }: { password: string; token: string }) => {
      await resetPassword({
        newPassword: password,
        token,
      });
    },
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  const resetPasswordMutation = (password: string) => {
    if (!token) {
      throw new Error('Invalid reset token');
    }
    mutation.mutate({ password, token });
  };

  return {
    resetPassword: resetPasswordMutation,
    isLoading: mutation.isPending,
    error: mutation.error?.message || tokenError,
    submitted,
    passwordChecks,
    passwordStrength,
    calculatePasswordStrength,
  };
}