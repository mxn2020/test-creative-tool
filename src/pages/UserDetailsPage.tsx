// src/pages/UserDetailsPage.tsx

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Div } from '../lib/dev-container';
import { useUserDetails } from '../hooks/useUserDetails';
import { useAuth } from '@/components/auth/AuthProvider';
import { UserDetailsLoadingState } from '@/components/users/details/UserDetailsLoadingState';
import { UserDetailsErrorState } from '@/components/users/details/UserDetailsErrorState';
import { UserDetailsHeader } from '@/components/users/details/UserDetailsHeader';
import { UserInfo } from '@/components/users/details/UserInfo';
import { UserPreferences } from '@/components/users/details/UserPreferences';
import { UserActivity } from '@/components/users/details/UserActivity';
import { UserSessions } from '@/components/users/details/UserSessions';
import { DeleteUserConfirmModal } from '@/components/users/details/DeleteUserConfirmModal';

export function UserDetailsPage() {
  const { userId } = useParams<{ userId: string }>();
  const { user: currentUser } = useAuth();
  const {
    user,
    isLoading,
    error,
    updateRole,
    deleteUser,
    terminateSession,
    isDeleting,
  } = useUserDetails(userId!);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteUser = async () => {
    deleteUser();
  };

  if (isLoading) {
    return <UserDetailsLoadingState />;
  }

  if (error || !user) {
    return <UserDetailsErrorState error={error} />;
  }

  return (
    <Container componentId="user-details-page" className="space-y-6">
      <UserDetailsHeader
        canDelete={currentUser?.id !== user.id}
        isDeleting={isDeleting}
        onDelete={() => setShowDeleteConfirm(true)}
      />

      <UserInfo 
        user={user} 
        onRoleChange={updateRole}
        canChangeRole={currentUser?.id !== user.id}
      />

      <UserPreferences preferences={user.preferences} />

      <Div devId="user-details-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserActivity activities={user.recentActivity} />
        
        <UserSessions 
          sessions={user.sessions}
          currentSessionId={currentUser?.sessionId}
          onTerminateSession={terminateSession}
        />
      </Div>

      {showDeleteConfirm && (
        <DeleteUserConfirmModal
          userName={user.name}
          isDeleting={isDeleting}
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={handleDeleteUser}
        />
      )}
    </Container>
  );
}