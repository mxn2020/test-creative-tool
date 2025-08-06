// src/components/admin/audit-logs/AuditLogsLoadingState.tsx

import { Container, Div, P } from '@/lib/dev-container';

export function AuditLogsLoadingState() {
  return (
    <Container componentId="audit-logs-loading-state">
      <Div devId="loading-wrapper" className="p-8">
        <Div devId="loading-content" className="flex flex-col items-center justify-center space-y-4">
          <Div 
            devId="loading-spinner" 
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"
          ></Div>
          <P devId="loading-text" className="text-gray-600">
            Loading audit logs...
          </P>
        </Div>
      </Div>
    </Container>
  );
}

