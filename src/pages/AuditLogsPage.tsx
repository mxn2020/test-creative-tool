import { Container } from '../lib/dev-container';
import { useAuditLogsPage } from '../hooks/useAuditLogsPage';
import { AuditLogLoadingState } from '../components/audit/AuditLogLoadingState';
import { AuditLogHeader } from '../components/audit/AuditLogHeader';
import { AuditLogErrorAlert } from '../components/audit/AuditLogErrorAlert';
import { AuditLogFilters } from '../components/audit/AuditLogFilters';
import { AuditLogsList } from '../components/audit/AuditLogsList';
import { AuditLogPagination } from '../components/audit/AuditLogPagination';

export function AuditLogsPage() {
  const {
    logs,
    totalPages,
    page,
    filterAction,
    isLoading,
    error,
    setPage,
    setFilterAction,
  } = useAuditLogsPage();

  if (isLoading && page === 1) {
    return <AuditLogLoadingState />;
  }

  return (
    <Container componentId="audit-logs-page" className="space-y-6 max-w-4xl mx-auto p-6">
      <AuditLogHeader />
      
      {error && <AuditLogErrorAlert error={error} />}

      <AuditLogFilters
        filterAction={filterAction}
        onFilterChange={setFilterAction}
      />

      <AuditLogsList logs={logs} filterAction={filterAction} />

      <AuditLogPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        isLoading={isLoading}
      />
    </Container>
  );
}