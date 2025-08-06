// src/components/users/details/UserDetailsHeader.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Div, Button } from '@/lib/dev-container';
import { ArrowLeft, Trash2 } from 'lucide-react';

interface UserDetailsHeaderProps {
  canDelete: boolean;
  isDeleting: boolean;
  onDelete: () => void;
}

export const UserDetailsHeader: React.FC<UserDetailsHeaderProps> = ({
  canDelete,
  isDeleting,
  onDelete,
}) => {
  return (
    <Container componentId="user-details-header">
      <Div devId="header-wrapper" className="flex justify-between items-start">
        <Div devId="header-nav" className="flex items-center gap-4">
          <Link to="/admin/users">
            <Button devId="back-button" variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Users
            </Button>
          </Link>
        </Div>
        {canDelete && (
          <Button
            devId="delete-user-button"
            variant="outline"
            size="sm"
            onClick={onDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete User
          </Button>
        )}
      </Div>
    </Container>
  );
};