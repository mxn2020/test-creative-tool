// src/hooks/useUsersPage.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserById, getUserDetails, updateUser, deleteUser, type User } from '../lib/api/users';

// Query keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

// Fetch user by ID (basic info)
export function useUser(userId: string | undefined) {
  return useQuery({
    queryKey: userKeys.detail(userId || ''),
    queryFn: async () => {
      console.log('useUser: Fetching user with ID:', userId);
      try {
        const user = await getUserById(userId!);
        console.log('useUser: Fetched user data:', user);
        return user;
      } catch (error) {
        console.error('useUser: Error fetching user:', error);
        throw error;
      }
    },
    enabled: !!userId,
  });
}

// Fetch user details (includes activity and sessions)
export function useUserDetails(userId: string | undefined) {
  return useQuery({
    queryKey: [...userKeys.detail(userId || ''), 'details'],
    queryFn: async () => {
      console.log('useUserDetails: Fetching detailed user data for ID:', userId);
      try {
        const userDetails = await getUserDetails(userId!);
        console.log('useUserDetails: Fetched detailed user data:', userDetails);
        return userDetails;
      } catch (error) {
        console.error('useUserDetails: Error fetching user details:', error);
        throw error;
      }
    },
    enabled: !!userId,
  });
}

// Update user mutation
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: Partial<User> }) =>
      updateUser(userId, data),
    onSuccess: (updatedUser) => {
      // Update the user in the cache
      queryClient.setQueryData(userKeys.detail(updatedUser.id), updatedUser);
      // Invalidate the users list to ensure it's fresh
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}

// Delete user mutation
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: (_, userId) => {
      // Remove the user from the cache
      queryClient.removeQueries({ queryKey: userKeys.detail(userId) });
      // Invalidate the users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}