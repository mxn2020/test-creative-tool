// src/components/users/details/UserInfo.tsx

import { Card, Badge, Button } from '@/lib/dev-container';
import { Mail, Calendar, Shield, Clock } from 'lucide-react';
import type { UserDetails } from '@/lib/api/users';

interface UserInfoProps {
  user: UserDetails;
  onRoleChange?: (newRole: 'user' | 'admin') => void;
  canChangeRole?: boolean;
}

export function UserInfo({ user, onRoleChange, canChangeRole }: UserInfoProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card devId="user-info-card" className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-2xl font-medium text-gray-600">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <Badge 
          devId="user-role-badge" 
          variant={user.role === 'admin' ? 'destructive' : 'secondary'}
        >
          {user.role}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 text-gray-600">
          <Mail className="h-4 w-4" />
          <div>
            <p className="text-sm font-medium">Email Status</p>
            <p className="text-sm">{user.emailVerified ? 'Verified' : 'Unverified'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <Calendar className="h-4 w-4" />
          <div>
            <p className="text-sm font-medium">Joined</p>
            <p className="text-sm">{formatDate(user.createdAt)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <Clock className="h-4 w-4" />
          <div>
            <p className="text-sm font-medium">Last Active</p>
            <p className="text-sm">{formatDate(user.lastActive)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <Shield className="h-4 w-4" />
          <div>
            <p className="text-sm font-medium">Role</p>
            <p className="text-sm capitalize">{user.role}</p>
          </div>
        </div>
      </div>

      {canChangeRole && onRoleChange && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Change User Role</p>
              <p className="text-sm text-gray-600">Update this user's permissions</p>
            </div>
            <Button
              devId="change-role-button"
              variant={user.role === 'admin' ? 'outline' : 'default'}
              size="sm"
              onClick={() => onRoleChange(user.role === 'admin' ? 'user' : 'admin')}
            >
              {user.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}