// src/hooks/useDashboard.ts

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from '@/lib/auth-client';
import { getUserSessions, type Session } from '@/lib/api/sessions';

export const dashboardKeys = {
  all: ['dashboard'] as const,
  sessions: () => [...dashboardKeys.all, 'sessions'] as const,
};

export function useDashboard() {
  const { data: session, isPending: sessionLoading } = useSession();
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [multipleSessions, setMultipleSessions] = useState(false);

  const { data: sessionsData, isLoading: sessionsLoading } = useQuery({
    queryKey: dashboardKeys.sessions(),
    queryFn: getUserSessions,
    enabled: !!session?.user,
    staleTime: 60 * 1000, // 1 minute
    retry: 3,
  });

  useEffect(() => {
    if (sessionsData) {
      const current = sessionsData.sessions.find(s => s.current);
      const activeSessions = sessionsData.sessions.filter(s => s.active);
      setCurrentSession(current || null);
      setMultipleSessions(activeSessions.length > 1);
    }
  }, [sessionsData]);

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getDaysSinceMember = (createdAt: string | Date | undefined) => {
    if (!createdAt) return 0;
    const date = createdAt instanceof Date ? createdAt : new Date(createdAt);
    return Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
  };

  return {
    session,
    sessionLoading,
    sessionsLoading,
    currentSession,
    multipleSessions,
    getUserInitials,
    getTimeRemaining,
    getDaysSinceMember,
  };
}