import { dataService } from './services/data';

// OAuth provider check (existing functionality)
export async function checkOAuthProviders() {
  // For now, OAuth is not configured
  // This function would normally check if OAuth environment variables are set
  return {
    google: false, // Would check for GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
    github: false, // Would check for GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET
  };
}

// Role types
export type UserRole = 'user' | 'admin';

// Role checking utilities
export async function getUserRole(userId: string): Promise<UserRole> {
  try {
    const userPref = await dataService.findOne('userPreference', { userId });
    return ((userPref as any)?.role as UserRole) || 'user';
  } catch (error) {
    console.error('Error fetching user role:', error);
    return 'user';
  }
}

export async function setUserRole(userId: string, role: UserRole): Promise<boolean> {
  try {
    await dataService.update('userPreference', 
      { userId }, 
      { role }
    );
    return true;
  } catch (error) {
    console.error('Error setting user role:', error);
    return false;
  }
}

export async function ensureUserPreferences(userId: string, defaults?: Partial<any>): Promise<void> {
  try {
    const existing = await dataService.findOne('userPreference', { userId });
    if (!existing) {
      await dataService.create('userPreference', {
        userId,
        role: 'user',
        ...defaults,
      });
    }
  } catch (error) {
    console.error('Error ensuring user preferences:', error);
  }
}

export function isAdmin(role: UserRole): boolean {
  return role === 'admin';
}

export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  if (requiredRole === 'user') return true; // All users have 'user' role
  return userRole === requiredRole;
}

// Audit logging utilities
export interface AuditLogEntry {
  userId: string;
  action: string;
  details?: any;
  ip?: string;
  userAgent?: string;
  success?: boolean;
  error?: string;
}

export async function createAuditLog(entry: AuditLogEntry): Promise<void> {
  try {
    await dataService.create('auditLog', {
      ...entry,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Error creating audit log:', error);
  }
}

export async function logAuthEvent(
  userId: string,
  action: 'login' | 'logout' | 'register' | 'password_change' | 'password_reset' | 'email_verified',
  request?: { ip?: string; userAgent?: string },
  details?: any,
  success: boolean = true,
  error?: string
): Promise<void> {
  await createAuditLog({
    userId,
    action,
    details,
    ip: request?.ip,
    userAgent: request?.userAgent,
    success,
    error,
  });
}