// src/components/audit/AuditLogHeader.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Div, H1, P, Button } from '@/lib/dev-container';

export const AuditLogHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container componentId="audit-log-header">
      <Div devId="header-wrapper" className="flex items-center justify-between">
        <Div devId="header-text">
          <H1 devId="header-title" className="text-3xl font-bold text-gray-900">Activity Log</H1>
          <P devId="header-description" className="text-gray-600 mt-1">
            View your account activity and security events
          </P>
        </Div>
        <Button
          devId="back-button"
          variant="outline"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </Button>
      </Div>
    </Container>
  );
};