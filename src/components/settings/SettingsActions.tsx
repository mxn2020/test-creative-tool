// src/components/settings/SettingsActions.tsx

import React from 'react';
import { Container, Div, Button } from '@/lib/dev-container';
import { Loader2 } from 'lucide-react';

interface SettingsActionsProps {
  onSave: () => void;
  isSaving: boolean;
}

export const SettingsActions: React.FC<SettingsActionsProps> = ({ onSave, isSaving }) => {
  return (
    <Container componentId="settings-actions">
      <Div devId="settings-actions-wrapper" className="flex justify-end">
        <Button 
          devId="save-settings-button" 
          variant="default" 
          size="lg"
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Settings'
          )}
        </Button>
      </Div>
    </Container>
  );
};