// src/components/dashboard/DashboardHeader.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '@/lib/auth-client';
import { useAuth } from '@/components/auth/AuthProvider';
import { Container, Div, Button, H1 } from '@/lib/dev-container';
import { LogOut, Home, Settings } from 'lucide-react';

export const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('[Dashboard] Logout failed:', error);
    }
  };

  return (
    <Container componentId="dashboard-header">
      <Div devId="dashboard-header-container" className="bg-white shadow-sm">
        <Div devId="dashboard-header-wrapper" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Div devId="dashboard-header-content" className="flex justify-between items-center h-16">
            <Div devId="dashboard-title-wrapper" className="flex items-center">
              <H1 devId="dashboard-title" className="text-xl font-semibold text-gray-900">
                Dashboard
              </H1>
            </Div>
            <Div devId="dashboard-actions" className="flex items-center gap-2">
              <Button
                devId="home-button"
                variant="ghost"
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Back to Home
              </Button>
              {isAdmin && (
                <Button
                  devId="admin-button"
                  variant="ghost"
                  onClick={() => navigate('/admin')}
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Admin Panel
                </Button>
              )}
              <Button
                devId="logout-button"
                variant="ghost"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </Div>
          </Div>
        </Div>
      </Div>
    </Container>
  );
};