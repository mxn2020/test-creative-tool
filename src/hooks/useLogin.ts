// src/hooks/useLogin.ts

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { signIn } from '@/lib/auth-client';

interface LoginData {
  email: string;
  password: string;
}

export function useLogin() {
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: LoginData) => {
      console.log('=== LOGIN ATTEMPT START ===');
      console.log('Email:', data.email);
      console.log('Password length:', data.password.length);
      
      const result = await signIn.email(data);
      
      if (result.error) {
        throw new Error(result.error.message || 'Login failed');
      }
      
      return result;
    },
    onSuccess: async (result) => {
      console.log('✅ Login successful:', result);
      
      // Get user ID from the result
      const userId = (result.data as any)?.user?.id;
      if (userId) {
        console.log('🔍 Checking user role for redirect...');
        
        // Check if user is admin
        try {
          const response = await fetch(`/api/user-role/${userId}`, {
            credentials: 'include',
          });
          
          if (response.ok) {
            const { role } = await response.json();
            console.log('👤 User role:', role);
            
            // Redirect based on role
            if (role === 'admin') {
              console.log('🔄 Redirecting admin to admin dashboard');
              window.location.href = '/admin';
            } else {
              console.log('🔄 Redirecting user to dashboard');
              window.location.href = '/dashboard';
            }
            return;
          }
        } catch (error) {
          console.error('Error checking user role:', error);
        }
      }
      
      // Fallback redirect
      const redirectUrl = (result.data as any)?.url;
      if (redirectUrl) {
        console.log('🔄 Better Auth provided redirect URL:', redirectUrl);
        window.location.href = redirectUrl;
      } else {
        console.log('🔄 Default redirect to dashboard');
        window.location.href = '/dashboard';
      }
    },
    onError: (err: any) => {
      console.log('💥 Login exception:', err);
      setError(err.message || 'An unexpected error occurred');
    },
  });

  const loginWithProvider = useMutation({
    mutationFn: async (provider: 'google' | 'github') => {
      await signIn.social({
        provider,
        callbackURL: '/dashboard'
      });
    },
    onError: (err: any, provider) => {
      setError(err.message || `${provider} login failed`);
    },
  });

  return {
    login: mutation.mutate,
    loginWithProvider: loginWithProvider.mutate,
    isLoading: mutation.isPending || loginWithProvider.isPending,
    error,
    setError,
  };
}