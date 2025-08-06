// src/components/auth/reset-password/ResetPasswordSuccess.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Container, Div } from '@/lib/dev-container';

export const ResetPasswordSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container componentId="reset-password-success">
      <Div devId="reset-password-success-wrapper" className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card devId="reset-password-success-card" className="w-full max-w-md">
          <CardHeader devId="success-card-header" className="text-center">
            <Div devId="success-icon-wrapper" className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </Div>
            <CardTitle devId="success-title" className="text-2xl">Password reset successful</CardTitle>
            <CardDescription devId="success-description" className="mt-2">
              Your password has been reset successfully. You can now sign in with your new password.
            </CardDescription>
          </CardHeader>
          <CardContent devId="success-card-content">
            <Button
              devId="continue-to-login-button"
              onClick={() => navigate('/login')}
              className="w-full"
            >
              Continue to sign in
            </Button>
          </CardContent>
        </Card>
      </Div>
    </Container>
  );
};