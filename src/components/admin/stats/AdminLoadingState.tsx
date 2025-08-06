// src/components/admin/stats/AdminLoadingState.tsx

import React from 'react';
import { Container, Div, P } from '@/lib/dev-container';

export const AdminLoadingState: React.FC = () => {
  return (
    <Container componentId="admin-dashboard-loading">
      <Div 
        devId="admin-loading-container"
        devName="Admin Loading Container"
        devDescription="Container for admin dashboard loading state"
        className="flex items-center justify-center h-64"
      >
        <Div 
          devId="admin-loading-content"
          devName="Admin Loading Content"
          devDescription="Content area for loading message and spinner"
          className="text-center"
        >
          <Div 
            devId="admin-loading-spinner"
            devName="Admin Loading Spinner"
            devDescription="Loading spinner animation"
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
          />
          <P 
            devId="admin-loading-text"
            devName="Admin Loading Text"
            devDescription="Loading message text"
            className="text-gray-600"
          >
            Loading dashboard...
          </P>
        </Div>
      </Div>
    </Container>
  );
};