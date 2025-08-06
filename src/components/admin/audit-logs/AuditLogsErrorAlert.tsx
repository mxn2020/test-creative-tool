// src/components/admin/audit-logs/AuditLogsErrorAlert.tsx

import { Container, Alert, Span } from '@/lib/dev-container';
import { AlertCircle } from 'lucide-react';

interface AuditLogsErrorAlertProps {
  error: Error | unknown;
}

export function AuditLogsErrorAlert({ error }: AuditLogsErrorAlertProps) {
  return (
    <Container componentId="audit-logs-error-alert">
      <Alert devId="error-alert" variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <Span devId="error-message" className="ml-2">
          {error instanceof Error ? error.message : 'Failed to load audit logs'}
        </Span>
      </Alert>
    </Container>
  );
}

