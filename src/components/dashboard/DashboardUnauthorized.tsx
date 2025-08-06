// src/components/dashboard/DashboardUnauthorized.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, Div, Button, H2, P } from '@/lib/dev-container';
import { Shield } from 'lucide-react';

interface DashboardUnauthorizedProps {
  isError?: boolean;
  errorMessage?: string;
}

export const DashboardUnauthorized: React.FC<DashboardUnauthorizedProps> = ({ isError, errorMessage }) => {
  const navigate = useNavigate();

  return (
    <Container componentId={isError ? "dashboard-error" : "dashboard-unauthorized"}>
      <Div devId="unauthorized-wrapper" className="min-h-screen flex items-center justify-center">
        <Card devId="unauthorized-card" className="w-full max-w-md">
          <CardContent devId="unauthorized-content" className="pt-6">
            <Div devId="unauthorized-center" className="text-center">
              <Shield className={`h-12 w-12 ${isError ? 'text-red-600' : 'text-muted-foreground'} mx-auto mb-4`} />
              <H2 devId="unauthorized-title" className="text-xl font-semibold mb-2">
                {isError ? 'Session Error' : 'Access Denied'}
              </H2>
              {isError && errorMessage && (
                <P devId="error-message" className="text-red-600 mb-4">{errorMessage}</P>
              )}
              <P devId="unauthorized-description" className="text-muted-foreground mb-4">
                {isError 
                  ? 'The authentication service returned invalid data. Please try logging in again.'
                  : 'Please log in to access your dashboard.'}
              </P>
              <Button devId="login-redirect-button" onClick={() => navigate('/login')} className="w-full">
                Go to Login
              </Button>
            </Div>
          </CardContent>
        </Card>
      </Div>
    </Container>
  );
};