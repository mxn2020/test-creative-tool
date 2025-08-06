// src/pages/UsersPage.tsx

import { Container } from '../lib/dev-container';
import { useUsersPage } from '../hooks/useUsersPage';
import { UsersHeader } from '@/components/users/UsersHeader';
import { UserFilters } from '@/components/users/UserFilters';
import { UsersErrorState } from '@/components/users/UsersErrorState';
import { UserTable } from '@/components/users/UserTable';
import { UserPagination } from '@/components/users/UserPagination';

export function UsersPage() {
  const {
    users,
    pagination,
    isLoading,
    error,
    filters,
    updateFilters,
    goToPage,
    nextPage,
    previousPage,
    canGoNext,
    canGoPrevious,
    handleUserHover,
  } = useUsersPage();

  return (
    <Container componentId="users-page" className="space-y-6">
      <UsersHeader totalCount={pagination.totalCount} />

      <UserFilters
        filters={filters}
        onFiltersChange={updateFilters}
        onSearch={() => updateFilters({})} // Triggers refetch
      />

      {error && <UsersErrorState error={error} />}

      {!error && (
        <>
          <UserTable 
            users={users} 
            onUserHover={handleUserHover}
            isLoading={isLoading}
          />

          <UserPagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={goToPage}
            onNext={nextPage}
            onPrevious={previousPage}
            canGoNext={canGoNext}
            canGoPrevious={canGoPrevious}
          />
        </>
      )}
    </Container>
  );
}