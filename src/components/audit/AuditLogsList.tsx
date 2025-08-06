// src/components/audit/AuditLogsList.tsx

import React from 'react';
import { Container, Div } from '@/lib/dev-container';
import { AuditLogCard } from './AuditLogCard';
import { AuditLogsEmptyState } from './AuditLogsEmptyState';

interface AuditLogsListProps {
  logs: any[];
  filterAction: string;
}

export const AuditLogsList: React.FC<AuditLogsListProps> = ({ logs, filterAction }) => {
  if (logs.length === 0) {
    return <AuditLogsEmptyState filterAction={filterAction} />;
  }

  return (
    <Container componentId="audit-logs-list">
      <Div devId="logs-list-wrapper" className="space-y-3">
        {logs.map((log) => (
          <AuditLogCard key={log.id} log={log} />
        ))}
      </Div>
    </Container>
  );
};