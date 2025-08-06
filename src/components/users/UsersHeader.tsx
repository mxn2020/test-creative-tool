// src/components/users/UsersHeader.tsx

import React from 'react';
import { Container, Div, H1, P, Span } from '@/lib/dev-container';
import { Users } from 'lucide-react';

interface UsersHeaderProps {
  totalCount: number;
}

export const UsersHeader: React.FC<UsersHeaderProps> = ({ totalCount }) => {
  return (
    <Container componentId="users-header">
      <Div devId="header-wrapper" className="flex justify-between items-center">
        <Div devId="header-text">
          <H1 devId="header-title" className="text-3xl font-bold text-gray-900">Users</H1>
          <P devId="header-description" className="text-gray-600 mt-1">
            Manage user accounts and permissions
          </P>
        </Div>
        <Div devId="header-stats" className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          <Span devId="total-users">{totalCount} total users</Span>
        </Div>
      </Div>
    </Container>
  );
};