// src/hooks/useUsersPage.ts

import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, updateUser, deleteUser, getUserById, type UsersResponse } from '../lib/api/users';
import { userKeys } from './useUserQueries';

export interface UsersFilters {
  search: string;
  role: string;
  page: number;
  limit: number;
}

export function useUsersPage() {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<UsersFilters>({
    search: '',
    role: '',
    page: 1,
    limit: 10,
  });

  // Main query for fetching users
  const {
    data,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['users', filters],
    queryFn: () => getUsers(filters),
    placeholderData: (previousData) => previousData, // Smooth pagination
    staleTime: 30 * 1000, // Consider data fresh for 30 seconds
  });

  // Mutation for updating user role
  const updateUserMutation = useMutation({
    mutationFn: ({ userId, updates }: { userId: string; updates: Parameters<typeof updateUser>[1] }) =>
      updateUser(userId, updates),
    onMutate: async ({ userId, updates }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['users'] });

      // Snapshot the previous value
      const previousUsers = queryClient.getQueryData(['users', filters]);

      // Optimistically update the cache
      queryClient.setQueryData(['users', filters], (old: UsersResponse | undefined) => {
        if (!old) return old;
        return {
          ...old,
          users: old.users.map((user) =>
            user.id === userId ? { ...user, ...updates } : user
          ),
        };
      });

      // Return context with snapshot
      return { previousUsers };
    },
    onError: (_err, _variables, context) => {
      // Rollback on error
      if (context?.previousUsers) {
        queryClient.setQueryData(['users', filters], context.previousUsers);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // Mutation for deleting user
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: ['users'] });
      const previousUsers = queryClient.getQueryData(['users', filters]);

      // Optimistically remove from cache
      queryClient.setQueryData(['users', filters], (old: UsersResponse | undefined) => {
        if (!old) return old;
        return {
          ...old,
          users: old.users.filter((user) => user.id !== userId),
          pagination: {
            ...old.pagination,
            totalCount: old.pagination.totalCount - 1,
          },
        };
      });

      return { previousUsers };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(['users', filters], context.previousUsers);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // Prefetch user data on hover
  const handleUserHover = useCallback(
    (userId: string) => {
      queryClient.prefetchQuery({
        queryKey: userKeys.detail(userId),
        queryFn: () => getUserById(userId),
        staleTime: 5 * 60 * 1000, // 5 minutes
      });
    },
    [queryClient]
  );

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<UsersFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      // Reset to page 1 when search or role changes
      page: newFilters.search !== undefined || newFilters.role !== undefined ? 1 : newFilters.page || prev.page,
    }));
  }, []);

  // Pagination helpers
  const goToPage = useCallback((page: number) => {
    updateFilters({ page });
  }, [updateFilters]);

  const nextPage = useCallback(() => {
    const totalPages = data?.pagination?.totalPages || 0;
    if (filters.page < totalPages) {
      goToPage(filters.page + 1);
    }
  }, [data?.pagination?.totalPages, filters.page, goToPage]);

  const previousPage = useCallback(() => {
    if (filters.page > 1) {
      goToPage(filters.page - 1);
    }
  }, [filters.page, goToPage]);

  return {
    // Data
    users: data?.users || [],
    pagination: data?.pagination || {
      page: 1,
      limit: filters.limit,
      totalCount: 0,
      totalPages: 0,
    },
    
    // Loading states
    isLoading,
    isFetching,
    error: error as Error | null,
    
    // Filters
    filters,
    updateFilters,
    
    // Pagination
    goToPage,
    nextPage,
    previousPage,
    canGoNext: data ? filters.page < (data.pagination?.totalPages || 0) : false,
    canGoPrevious: filters.page > 1,
    
    // Mutations
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
    isUpdating: updateUserMutation.isPending,
    isDeleting: deleteUserMutation.isPending,
    
    // Prefetching
    handleUserHover,
  };
}