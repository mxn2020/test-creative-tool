// src/pages/AdminAuditLogsPage.tsx

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/lib/api/users';
import { useAuditLogs } from '@/hooks/useAuditLogQueries';
import { Container, Div } from '@/lib/dev-container';
import { AuditLogsHeader } from '@/components/admin/audit-logs/AuditLogsHeader';
import { AuditLogsFilters } from '@/components/admin/audit-logs/AuditLogsFilters';
import { AuditLogsTable } from '@/components/admin/audit-logs/AuditLogsTable';
import { AuditLogsPagination } from '@/components/admin/audit-logs/AuditLogsPagination';
import { AuditLogsErrorAlert } from '@/components/admin/audit-logs/AuditLogsErrorAlert';
import { AuditLogsLoadingState } from '@/components/admin/audit-logs/AuditLogsLoadingState';

export function AdminAuditLogsPage() {
  const [page, setPage] = useState(1);
  const [filterAction, setFilterAction] = useState('');
  const [filterUserId, setFilterUserId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Fetch users for the filter dropdown
  const { data: usersData } = useQuery({
    queryKey: ['users', 'filter-list'],
    queryFn: () => getUsers({ limit: 100 }),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const users = usersData?.users || [];

  // Fetch audit logs with React Query
  const { data, isLoading, error } = useAuditLogs({
    page,
    limit: 50,
    action: filterAction || undefined,
    userId: filterUserId || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  const logs = data?.logs || [];
  const totalPages = data?.pagination.totalPages || 1;

  const handleClearFilters = () => {
    setFilterUserId('');
    setFilterAction('');
    setStartDate('');
    setEndDate('');
    setPage(1);
  };

  const handleFilterChange = (filters: {
    filterUserId?: string;
    filterAction?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    if (filters.filterUserId !== undefined) setFilterUserId(filters.filterUserId);
    if (filters.filterAction !== undefined) setFilterAction(filters.filterAction);
    if (filters.startDate !== undefined) setStartDate(filters.startDate);
    if (filters.endDate !== undefined) setEndDate(filters.endDate);
    setPage(1);
  };

  if (isLoading && page === 1) {
    return (
      <Container componentId="admin-audit-logs-page-loading">
        <AuditLogsLoadingState />
      </Container>
    );
  }

  return (
    <Container componentId="admin-audit-logs-page">
      <Div devId="audit-logs-page-wrapper" className="space-y-6">
        {/* Header */}
        <AuditLogsHeader 
          filterAction={filterAction}
          filterUserId={filterUserId}
          startDate={startDate}
          endDate={endDate}
        />

        {/* Error Alert */}
        {error && <AuditLogsErrorAlert error={error} />}

        {/* Filters */}
        <AuditLogsFilters
          users={users}
          filterUserId={filterUserId}
          filterAction={filterAction}
          startDate={startDate}
          endDate={endDate}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        {/* Logs Table */}
        <AuditLogsTable logs={logs} />

        {/* Pagination */}
        {totalPages > 1 && (
          <AuditLogsPagination
            currentPage={page}
            totalPages={totalPages}
            isLoading={isLoading}
            onPageChange={setPage}
          />
        )}
      </Div>
    </Container>
  );
}