// src/components/users/details/UserPreferences.tsx

import React from 'react';
import { Container, Card, Div, H3, P } from '@/lib/dev-container';

interface UserPreferencesProps {
  preferences: {
    theme: string;
    emailNotifications: boolean;
    language: string;
    timezone: string;
  };
}

export const UserPreferences: React.FC<UserPreferencesProps> = ({ preferences }) => {
  return (
    <Container componentId="user-preferences">
      <Card devId="preferences-card" className="p-6">
        <H3 devId="preferences-title" className="text-lg font-semibold mb-4">User Preferences</H3>
        <Div devId="preferences-grid" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Div devId="theme-preference">
            <P devId="theme-label" className="text-sm font-medium text-gray-700">Theme</P>
            <P devId="theme-value" className="text-sm text-gray-600 capitalize">{preferences.theme}</P>
          </Div>
          <Div devId="email-preference">
            <P devId="email-label" className="text-sm font-medium text-gray-700">Email Notifications</P>
            <P devId="email-value" className="text-sm text-gray-600">
              {preferences.emailNotifications ? 'Enabled' : 'Disabled'}
            </P>
          </Div>
          <Div devId="language-preference">
            <P devId="language-label" className="text-sm font-medium text-gray-700">Language</P>
            <P devId="language-value" className="text-sm text-gray-600">{preferences.language.toUpperCase()}</P>
          </Div>
          <Div devId="timezone-preference">
            <P devId="timezone-label" className="text-sm font-medium text-gray-700">Timezone</P>
            <P devId="timezone-value" className="text-sm text-gray-600">{preferences.timezone}</P>
          </Div>
        </Div>
      </Card>
    </Container>
  );
};