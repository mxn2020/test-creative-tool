// src/components/audit/AuditLogLoadingState.tsx

import React from 'react';
import { Container, Div, P } from '@/lib/dev-container';

export const AuditLogLoadingState: React.FC = () => {
  return (
    <Container componentId="audit-logs-loading" className="p-8">
      <Div devId="loading-wrapper" className="flex flex-col items-center justify-center space-y-4">
        <Div devId="loading-spinner" className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></Div>
        <P devId="loading-text" className="text-gray-600">Loading activity logs...</P>
      </Div>
    </Container>
  );
};