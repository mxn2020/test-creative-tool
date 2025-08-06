// src/components/users/details/DeleteUserConfirmModal.tsx

import React from 'react';
import { Container, Div, Card, H3, P, Button } from '@/lib/dev-container';

interface DeleteUserConfirmModalProps {
  userName: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const DeleteUserConfirmModal: React.FC<DeleteUserConfirmModalProps> = ({
  userName,
  isDeleting,
  onCancel,
  onConfirm,
}) => {
  return (
    <Container componentId="delete-user-confirm-modal">
      <Div devId="modal-backdrop" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card devId="delete-confirm-card" className="p-6 max-w-md mx-4">
          <H3 devId="modal-title" className="text-lg font-semibold mb-4">Delete User?</H3>
          <P devId="modal-message" className="text-gray-600 mb-6">
            Are you sure you want to delete {userName}? This action cannot be undone.
          </P>
          <Div devId="modal-actions" className="flex gap-3 justify-end">
            <Button
              devId="cancel-delete-button"
              variant="outline"
              onClick={onCancel}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              devId="confirm-delete-button"
              variant="destructive"
              onClick={onConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete User'}
            </Button>
          </Div>
        </Card>
      </Div>
    </Container>
  );
};