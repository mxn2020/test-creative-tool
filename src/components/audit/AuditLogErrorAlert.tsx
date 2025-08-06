// src/components/audit/AuditLogErrorAlert.tsx

import React from 'react';
import { Container, Alert, AlertDescription } from '@/lib/dev-container';
import { AlertCircle } from 'lucide-react';

interface AuditLogErrorAlertProps {
  error: string;
}

export const AuditLogErrorAlert: React.FC<AuditLogErrorAlertProps> = ({ error }) => {
  return (
    <Container componentId="audit-log-error-alert">
      <Alert devId="error-alert" variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription devId="error-text" className="ml-2">
          {error}
        </AlertDescription>
      </Alert>
    </Container>
  );
};