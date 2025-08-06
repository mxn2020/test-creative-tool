import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { Container } from '@/lib/dev-container';
import { Loader2, ShieldX } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

interface AdminRouteProps {
  children: React.ReactNode;
  fallback?: string;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ 
  children
}) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <Container componentId="admin-route-loading">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="animate-spin h-8 w-8 text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Checking permissions...</p>
          </div>
        </div>
      </Container>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login with return path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    // Show access denied page
    return (
      <Container componentId="admin-route-denied">
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <ShieldX className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
                <p className="text-muted-foreground mb-4">
                  You don't have permission to access this page.
                </p>
                <p className="text-sm text-muted-foreground">
                  This area is restricted to administrators only.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }

  return <>{children}</>;
};

// HOC version for easier use
export const withAdminRoute = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: string
) => {
  return (props: P) => (
    <AdminRoute fallback={fallback}>
      <Component {...props} />
    </AdminRoute>
  );
};