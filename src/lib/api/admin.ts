// src/lib/api/admin.ts

export interface AdminStats {
  users: {
    total: number;
    active: number;
    verified: number;
    admins: number;
    activeSessions: number;
  };
  content: {
    posts: number;
    publishedPosts: number;
    comments: number;
    categories: number;
    recentPosts: number;
    recentComments: number;
  };
  growth: {
    userGrowth: Array<{
      date: string;
      count: number;
    }>;
  };
  recentActivities: Array<{
    type: string;
    description: string;
    timestamp: string;
    icon: string;
    color: string;
  }>;
  systemHealth: {
    database: {
      status: string;
      responseTime: number;
      percentage: number;
    };
    api: {
      status: string;
      responseTime: number;
      percentage: number;
    };
    errorRate: {
      value: number;
      percentage: number;
    };
  };
}

function getApiUrl() {
  // Always use relative URLs so Vite proxy can handle them in development
  return '/api';
}

export async function getAdminStats(): Promise<AdminStats> {
  const response = await fetch(`${getApiUrl()}/admin-stats`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Authentication required');
    }
    if (response.status === 403) {
      throw new Error('Admin access required');
    }
    throw new Error('Failed to fetch admin stats');
  }

  return response.json();
}