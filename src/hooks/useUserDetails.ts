// src/hooks/useUserDetails.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserDetails, updateUser, deleteUser } from '../lib/api/users';
import { userKeys } from './useUserQueries';
import { useNavigate } from 'react-router-dom';

export function useUserDetails(userId: string) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch user details
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => getUserDetails(userId),
    enabled: !!userId,
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: (updates: Parameters<typeof updateUser>[1]) => 
      updateUser(userId, updates),
    onSuccess: (updatedUser) => {
      // Update the user details cache
      queryClient.setQueryData(userKeys.detail(userId), updatedUser);
      // Invalidate the users list to reflect changes
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: () => deleteUser(userId),
    onSuccess: () => {
      // Invalidate user queries
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.removeQueries({ queryKey: userKeys.detail(userId) });
      // Navigate back to users list
      navigate('/admin/users');
    },
  });

  // Terminate session mutation (placeholder - would need API endpoint)
  const terminateSessionMutation = useMutation({
    mutationFn: async (sessionId: string) => {
      // This would call an API endpoint to terminate the session
      console.log('Terminating session:', sessionId);
      // For now, just simulate success
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      // Refetch user details to get updated sessions
      queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });
    },
  });

  return {
    user,
    isLoading,
    error: error as Error | null,
    
    // Mutations
    updateRole: (role: 'user' | 'admin') => updateUserMutation.mutate({ role }),
    deleteUser: deleteUserMutation.mutate,
    terminateSession: terminateSessionMutation.mutate,
    
    // Loading states
    isUpdating: updateUserMutation.isPending,
    isDeleting: deleteUserMutation.isPending,
    isTerminatingSession: terminateSessionMutation.isPending,
  };
}