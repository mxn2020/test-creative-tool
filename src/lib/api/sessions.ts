// src/lib/api/sessions.ts

export interface Session {
  id: string;
  active: boolean;
  current: boolean;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  ipAddress: string;
  userAgent: string;
  device: string;
  browser: string;
  os: string;
  location: string;
}

export interface SessionsResponse {
  sessions: Session[];
}

function getApiUrl() {
  // In production, API routes are at the same origin
  // In development, they might be at a different port
  const baseUrl = import.meta.env.VITE_API_URL || '';
  return `${baseUrl}/api`;
}

export async function getUserSessions(): Promise<SessionsResponse> {
  const response = await fetch(`${getApiUrl()}/sessions`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch sessions');
  }

  return response.json();
}

export async function revokeSession(sessionId: string): Promise<void> {
  const response = await fetch(`${getApiUrl()}/sessions/${sessionId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to revoke session');
  }
}

export async function revokeAllOtherSessions(): Promise<{ count: number }> {
  const response = await fetch(`${getApiUrl()}/sessions/all-others`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to revoke sessions');
  }

  const data = await response.json();
  return { count: data.count };
}