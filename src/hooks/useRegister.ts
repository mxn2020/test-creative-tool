// src/hooks/useRegister.ts

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { signUp, signIn } from '@/lib/auth-client';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export function useRegister() {
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      console.log('=== REGISTER ATTEMPT START ===');
      console.log('Email:', data.email);
      console.log('Name:', data.name);
      console.log('Password length:', data.password.length);
      
      const result = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        callbackURL: '/dashboard'
      });
      
      if (result.error) {
        throw new Error(result.error.message || 'Registration failed');
      }
      
      return result;
    },
    onSuccess: (result) => {
      console.log('✅ Registration successful:', result);
      
      // Check if Better Auth handled the redirect
      const redirectUrl = (result.data as any)?.url;
      if (redirectUrl) {
        console.log('🔄 Better Auth provided redirect URL:', redirectUrl);
        window.location.href = redirectUrl;
      } else {
        console.log('🔄 Manual redirect to dashboard');
        window.location.href = '/dashboard';
      }
    },
    onError: (err: any) => {
      console.log('💥 Registration exception:', err);
      
      // Enhanced error handling for common deployment issues
      let errorMessage = err.message || 'Registration failed';
      
      if (err.status === 504) {
        errorMessage = 'Server timeout. Please check server configuration.';
      } else if (err.status === 502) {
        errorMessage = 'Server error. Please check environment variables.';
      }
      
      setError(errorMessage);
    },
  });

  const registerWithProvider = useMutation({
    mutationFn: async (provider: 'google' | 'github') => {
      await signIn.social({
        provider,
        callbackURL: '/dashboard'
      });
    },
    onError: (err: any, provider) => {
      setError(err.message || `${provider} registration failed`);
    },
  });

  return {
    register: mutation.mutate,
    registerWithProvider: registerWithProvider.mutate,
    isLoading: mutation.isPending || registerWithProvider.isPending,
    error,
    setError,
  };
}