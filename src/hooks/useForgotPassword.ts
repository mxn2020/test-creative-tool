// src/hooks/useForgotPassword.ts

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { forgetPassword } from '@/lib/auth-client';

export function useForgotPassword() {
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      await forgetPassword({
        email,
        redirectTo: '/reset-password',
      });
    },
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  return {
    sendResetEmail: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error?.message || null,
    submitted,
    reset: () => {
      setSubmitted(false);
      mutation.reset();
    },
  };
}