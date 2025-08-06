// src/hooks/useAdminDashboard.ts

import { useQuery } from '@tanstack/react-query';
import { getAdminStats } from '../lib/api/admin';

// Query keys
export const adminDashboardKeys = {
  all: ['adminDashboard'] as const,
  stats: () => [...adminDashboardKeys.all, 'stats'] as const,
};

// Fetch admin dashboard stats
export function useAdminDashboard() {
  return useQuery({
    queryKey: adminDashboardKeys.stats(),
    queryFn: getAdminStats,
    staleTime: 60 * 1000, // Consider data fresh for 60 seconds
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

