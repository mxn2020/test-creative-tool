// src/lib/api/user-role.ts
// Client-side API for user role operations

export type UserRole = 'user' | 'admin';

const getApiUrl = () => {
  if (typeof window === 'undefined') {
    return "http://localhost:8889/api";
  }
  
  const { protocol, hostname, port } = window.location;
  
  // If running on Vite dev server port, use Netlify dev server port
  if (port === '5176') {
    return `${protocol}//${hostname}:8889/api`;
  }
  
  // Otherwise use the current origin
  return `${window.location.origin}/api`;
};

export async function getUserRole(userId: string): Promise<UserRole> {
  try {
    const response = await fetch(`${getApiUrl()}/user-role/${userId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get user role: ${response.statusText}`);
    }

    const data = await response.json();
    return data.role || 'user';
  } catch (error) {
    console.error('Error fetching user role:', error);
    return 'user';
  }
}

export async function setUserRole(userId: string, role: UserRole): Promise<boolean> {
  try {
    const response = await fetch(`${getApiUrl()}/user-role/${userId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error setting user role:', error);
    return false;
  }
}

export async function ensureUserPreferences(userId: string): Promise<void> {
  // This is now handled by the GET endpoint which creates defaults if not found
  await getUserRole(userId);
}

export function isAdmin(role: UserRole): boolean {
  return role === 'admin';
}

export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  if (requiredRole === 'user') return true; // All users have 'user' role
  return userRole === requiredRole;
}