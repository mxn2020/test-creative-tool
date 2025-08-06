import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession, signIn, signOut, signUp } from '@/lib/auth-client';
import { getUserRole, UserRole, ensureUserPreferences } from '@/lib/api/user-role';

type Session = any; // Better Auth session type
type User = any; // Better Auth user type

interface AuthContextType {
  session: Session | null;
  user: User | null;
  role: UserRole;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  signIn: typeof signIn;
  signOut: typeof signOut;
  signUp: typeof signUp;
  refreshRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: session, isPending, error } = useSession();
  const [role, setRole] = useState<UserRole>('user');
  const [roleLoading, setRoleLoading] = useState(false);

  useEffect(() => {
    if (error) {
      console.warn('Session error (this is expected if backend is not running):', error);
    }
  }, [error]);

  // Check if session is valid JSON object, not HTML
  const isValidSession = session && typeof session === 'object' && session.user;
  
  useEffect(() => {
    console.log('[AuthProvider] Session data:', session);
    console.log('[AuthProvider] Is valid session:', isValidSession);
    if (session && typeof session === 'string' && (session as string).includes('<!doctype html>')) {
      console.error('[AuthProvider] Session returned HTML instead of JSON. Check auth endpoint configuration.');
    }
  }, [session, isValidSession]);

  // Fetch user role when session changes
  useEffect(() => {
    const fetchRole = async () => {
      if (isValidSession && session.user?.id) {
        setRoleLoading(true);
        try {
          // Ensure user preferences exist
          await ensureUserPreferences(session.user.id);
          // Get user role
          const userRole = await getUserRole(session.user.id);
          setRole(userRole);
        } catch (error) {
          console.error('[AuthProvider] Error fetching user role:', error);
          setRole('user');
        } finally {
          setRoleLoading(false);
        }
      } else {
        setRole('user');
      }
    };

    fetchRole();
  }, [isValidSession, session?.user?.id]);

  const refreshRole = async () => {
    if (isValidSession && session.user?.id) {
      const userRole = await getUserRole(session.user.id);
      setRole(userRole);
    }
  };

  const value: AuthContextType = {
    session: isValidSession ? session : null,
    user: isValidSession ? session.user : null,
    role,
    isLoading: isPending || roleLoading,
    isAuthenticated: !!isValidSession,
    isAdmin: role === 'admin',
    signIn,
    signOut,
    signUp,
    refreshRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};