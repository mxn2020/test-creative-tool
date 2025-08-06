// src/components/audit/AuditLogsEmptyState.tsx

import React from 'react';
import { Container, Div, Card, P } from '@/lib/dev-container';
import { Shield } from 'lucide-react';

interface AuditLogsEmptyStateProps {
  filterAction: string;
}

export const AuditLogsEmptyState: React.FC<AuditLogsEmptyStateProps> = ({ filterAction }) => {
  return (
    <Container componentId="audit-logs-empty-state">
      <Card devId="no-logs-card" className="p-8 text-center">
        <Div devId="empty-state-content" className="flex flex-col items-center">
          <Div devId="empty-state-icon" className="p-4 bg-gray-100 rounded-full mb-4">
            <Shield className="h-8 w-8 text-gray-400" />
          </Div>
          <P devId="empty-state-title" className="text-gray-600">No activity logs found</P>
          <P devId="empty-state-description" className="text-sm text-gray-500 mt-1">
            {filterAction ? 'Try changing your filters' : 'Your activity will appear here'}
          </P>
        </Div>
      </Card>
    </Container>
  );
};