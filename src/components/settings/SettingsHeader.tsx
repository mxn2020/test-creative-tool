// src/components/settings/SettingsHeader.tsx

import React from 'react';
import { Container, Div, H1, P } from '@/lib/dev-container';

export const SettingsHeader: React.FC = () => {
  return (
    <Container componentId="settings-header">
      <Div devId="settings-header-content">
        <H1 devId="settings-title" className="text-3xl font-bold text-gray-900">Settings</H1>
        <P devId="settings-description" className="text-gray-600 mt-1">
          Manage your application settings and preferences
        </P>
      </Div>
    </Container>
  );
};