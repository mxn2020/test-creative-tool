// src/components/sessions/RevokeAllConfirmDialog.tsx

import React from 'react';
import { Container, Alert, Div, P, Button } from '@/lib/dev-container';

interface RevokeAllConfirmDialogProps {
  onCancel: () => void;
  onConfirm: () => void;
  isRevoking: boolean;
}

export const RevokeAllConfirmDialog: React.FC<RevokeAllConfirmDialogProps> = ({
  onCancel,
  onConfirm,
  isRevoking,
}) => {
  return (
    <Container componentId="revoke-all-confirm-dialog">
      <Alert devId="revoke-all-confirm" variant="destructive">
        <Div devId="confirm-content" className="flex items-center justify-between">
          <Div devId="confirm-text">
            <P devId="confirm-title" className="font-semibold">Sign out all other sessions?</P>
            <P devId="confirm-description" className="text-sm mt-1">
              This will sign you out from all devices except this one.
            </P>
          </Div>
          <Div devId="confirm-actions" className="flex gap-2">
            <Button
              devId="cancel-revoke-all"
              variant="outline"
              size="sm"
              onClick={onCancel}
              disabled={isRevoking}
            >
              Cancel
            </Button>
            <Button
              devId="confirm-revoke-all"
              variant="destructive"
              size="sm"
              onClick={onConfirm}
              disabled={isRevoking}
            >
              {isRevoking ? 'Signing out...' : 'Sign out all'}
            </Button>
          </Div>
        </Div>
      </Alert>
    </Container>
  );
};