// src/components/settings/GeneralSettings.tsx

import React from 'react';
import { Container, Card, Div, H2, Label, Input } from '@/lib/dev-container';
import { Settings } from 'lucide-react';

interface GeneralSettingsProps {
  appName: string;
  appUrl: string;
  onAppNameChange: (value: string) => void;
  onAppUrlChange: (value: string) => void;
}

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  appName,
  appUrl,
  onAppNameChange,
  onAppUrlChange,
}) => {
  return (
    <Container componentId="general-settings">
      <Card devId="general-settings-card" className="p-6">
        <Div devId="general-settings-header" className="flex items-center gap-3 mb-4">
          <Settings className="h-5 w-5 text-gray-600" />
          <H2 devId="general-settings-title" className="text-xl font-semibold">General Settings</H2>
        </Div>
        <Div devId="general-settings-content" className="space-y-4">
          <Div devId="app-name-field">
            <Label devId="app-name-label" htmlFor="app-name">Application Name</Label>
            <Input
              devId="app-name-input"
              id="app-name"
              type="text"
              value={appName}
              onChange={(e) => onAppNameChange(e.target.value)}
              placeholder="My Application"
              className="mt-1"
            />
          </Div>
          <Div devId="app-url-field">
            <Label devId="app-url-label" htmlFor="app-url">Application URL</Label>
            <Input
              devId="app-url-input"
              id="app-url"
              type="url"
              value={appUrl}
              onChange={(e) => onAppUrlChange(e.target.value)}
              placeholder="https://myapp.com"
              className="mt-1"
            />
          </Div>
        </Div>
      </Card>
    </Container>
  );
};