// src/components/users/UserFilters.tsx

import React from 'react';
import { Card, Input, Label, Button, Container } from '@/lib/dev-container';
import { Search } from 'lucide-react';
import type { UsersFilters } from '../../hooks/useUsersPage';

interface UserFiltersProps {
  filters: UsersFilters;
  onFiltersChange: (filters: Partial<UsersFilters>) => void;
  onSearch: () => void;
}

export function UserFilters({ filters, onFiltersChange, onSearch }: UserFiltersProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <Container componentId="user-filters-component">
      <Card devId="users-filters" className="p-4">
        <form onSubmit={handleSubmit} className="flex gap-4 items-end">
          <div className="flex-1">
            <Label devId="search-label" htmlFor="search">Search users</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                devId="search-input"
                id="search"
                type="text"
                placeholder="Search by name or email..."
                value={filters.search}
                onChange={(e) => onFiltersChange({ search: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>
          <div className="w-48">
            <Label devId="role-label" htmlFor="role-filter">Filter by role</Label>
            <select
              id="role-filter"
              value={filters.role}
              onChange={(e) => onFiltersChange({ role: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">All roles</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <Button devId="search-button" type="submit" variant="default">
            Search
          </Button>
        </form>
      </Card>
    </Container>
  );
}