// src/components/users/UserTable.tsx

import { Link } from 'react-router-dom';
import { Card, Badge, Container } from '@/lib/dev-container';
import { UserCheck, UserX } from 'lucide-react';
import type { User } from '@/lib/api/users';

interface UserTableProps {
  users: User[];
  onUserHover?: (userId: string) => void;
  isLoading?: boolean;
}

export function UserTable({ users, onUserHover, isLoading }: UserTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getRoleBadgeVariant = (role: string) => {
    return role === 'admin' ? 'destructive' : 'secondary';
  };

  if (isLoading) {
    return (
      <Container componentId="user-table-component">
        <Card devId="users-table-loading" className="p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
        </Card>
      </Container>
    );
  }

  if (users.length === 0) {
    return (
      <Container componentId="user-table-component">
        <Card devId="users-table-empty" className="p-8">
        <div className="text-center text-gray-500">
          No users found matching your criteria.
        </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container componentId="user-table-component">
      <Card devId="users-table-card" className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Active
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr 
                key={user.id} 
                className="hover:bg-gray-50 transition-colors"
                onMouseEnter={() => onUserHover?.(user.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge devId="role-badge-dynamic" variant={getRoleBadgeVariant(user.role)}>
                    {user.role}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {user.emailVerified ? (
                      <>
                        <UserCheck className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-700">Verified</span>
                      </>
                    ) : (
                      <>
                        <UserX className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-yellow-700">Unverified</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(user.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(user.lastActive)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={`/admin/users/${user.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </Card>
    </Container>
  );
}