import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSession } from '@/lib/auth-client';
import { Container } from '@/lib/dev-container';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  const { data: session, isPending } = useSession();
  const location = useLocation();

  if (isPending) {
    return (
      <Container componentId="protected-route-loading">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Checking authentication...</p>
          </div>
        </div>
      </Container>
    );
  }

  if (!session) {
    // Save the attempted location to redirect after login
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Higher-order component version for easier usage
export const withProtectedRoute = <P extends object>(
  Component: React.ComponentType<P>,
  redirectTo?: string
) => {
  const ProtectedComponent: React.FC<P> = (props) => (
    <ProtectedRoute redirectTo={redirectTo}>
      <Component {...props} />
    </ProtectedRoute>
  );

  ProtectedComponent.displayName = `withProtectedRoute(${Component.displayName || Component.name})`;
  
  return ProtectedComponent;
};