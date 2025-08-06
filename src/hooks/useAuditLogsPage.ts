import { useState } from 'react';
import { useAuditLogs } from './useAuditLogQueries';

export function useAuditLogsPage() {
  const [page, setPage] = useState(1);
  const [filterAction, setFilterAction] = useState('');

  const { data, isLoading, error } = useAuditLogs({
    page,
    limit: 20,
    action: filterAction || undefined,
  });

  const handleFilterChange = (action: string) => {
    setFilterAction(action);
    setPage(1); // Reset to first page when filter changes
  };

  return {
    logs: data?.logs ?? [],
    totalPages: data?.pagination?.totalPages ?? 1,
    page,
    filterAction,
    isLoading,
    error: error ? (error as Error).message : null,
    setPage,
    setFilterAction: handleFilterChange,
  };
}