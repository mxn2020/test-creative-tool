// src/components/auth/forgot-password/ForgotPasswordSuccess.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Alert, AlertDescription, Container, Div } from '@/lib/dev-container';

interface ForgotPasswordSuccessProps {
  email: string;
}

export const ForgotPasswordSuccess: React.FC<ForgotPasswordSuccessProps> = ({ email }) => {
  const navigate = useNavigate();

  return (
    <Container componentId="forgot-password-success">
      <Div devId="forgot-password-success-wrapper" className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card devId="forgot-password-success-card" className="w-full max-w-md">
          <CardHeader devId="success-card-header" className="text-center">
            <Div devId="success-icon-wrapper" className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </Div>
            <CardTitle devId="success-title" className="text-2xl">Check your email</CardTitle>
            <CardDescription devId="success-description" className="mt-2">
              We've sent a password reset link to <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent devId="success-card-content" className="space-y-4">
            <Alert devId="reset-link-info-alert" className="bg-blue-50 border-blue-200">
              <AlertDescription devId="reset-link-description" className="text-blue-800">
                The reset link will expire in 1 hour. If you don't see the email, check your spam folder.
              </AlertDescription>
            </Alert>
            <Button
              devId="back-to-login-button"
              onClick={() => navigate('/login')}
              className="w-full"
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Button>
          </CardContent>
        </Card>
      </Div>
    </Container>
  );
};