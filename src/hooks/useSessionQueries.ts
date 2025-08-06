import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getUserSessions, 
  revokeSession, 
  revokeAllOtherSessions,
} from '../lib/api/sessions';

// Query Keys
export const sessionQueryKeys = {
  all: ['sessions'] as const,
  list: () => [...sessionQueryKeys.all, 'list'] as const,
};

// Queries
export function useSessionsQuery() {
  return useQuery({
    queryKey: sessionQueryKeys.list(),
    queryFn: getUserSessions,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Mutations
export function useRevokeSessionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: revokeSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionQueryKeys.list() });
    },
  });
}

export function useRevokeAllSessionsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: revokeAllOtherSessions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionQueryKeys.list() });
    },
  });
}

// Combined hook for SessionsPage
export function useSessions() {
  const { data, isLoading, error } = useSessionsQuery();
  const revokeSessionMutation = useRevokeSessionMutation();
  const revokeAllMutation = useRevokeAllSessionsMutation();

  const sessions = data?.sessions ?? [];
  const activeSessions = sessions.filter(s => s.active);
  const currentSession = sessions.find(s => s.current);

  return {
    sessions,
    activeSessions,
    currentSession,
    isLoading,
    error: error ? (error as Error).message : null,
    revokeSession: revokeSessionMutation.mutate,
    isRevokingSession: revokeSessionMutation.isPending,
    revokingSessionId: revokeSessionMutation.variables,
    revokeAllOtherSessions: revokeAllMutation.mutate,
    isRevokingAll: revokeAllMutation.isPending,
  };
}