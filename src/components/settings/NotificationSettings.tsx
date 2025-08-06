// src/components/settings/NotificationSettings.tsx

import React from 'react';
import { Container, Card, Div, H2, P, Label, Input } from '@/lib/dev-container';
import { Bell } from 'lucide-react';

interface NotificationSettingsProps {
  emailNotifications: boolean;
  pushNotifications: boolean;
  onEmailChange: (value: boolean) => void;
  onPushChange: (value: boolean) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  emailNotifications,
  pushNotifications,
  onEmailChange,
  onPushChange,
}) => {
  return (
    <Container componentId="notification-settings">
      <Card devId="notification-settings-card" className="p-6">
        <Div devId="notification-settings-header" className="flex items-center gap-3 mb-4">
          <Bell className="h-5 w-5 text-gray-600" />
          <H2 devId="notification-settings-title" className="text-xl font-semibold">Notification Settings</H2>
        </Div>
        <Div devId="notification-settings-content" className="space-y-4">
          <Div devId="email-notification-field" className="flex items-center justify-between">
            <Div devId="email-notification-info">
              <P devId="email-notification-title" className="font-medium">Email Notifications</P>
              <P devId="email-notification-desc" className="text-sm text-gray-600">
                Receive email alerts for important events
              </P>
            </Div>
            <Label devId="email-toggle-label" className="relative inline-flex items-center cursor-pointer">
              <Input
                devId="email-toggle-input"
                type="checkbox"
                className="sr-only peer"
                checked={emailNotifications}
                onChange={(e) => onEmailChange(e.target.checked)}
              />
              <Div devId="email-toggle-switch" className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></Div>
            </Label>
          </Div>
          <Div devId="push-notification-field" className="flex items-center justify-between">
            <Div devId="push-notification-info">
              <P devId="push-notification-title" className="font-medium">Push Notifications</P>
              <P devId="push-notification-desc" className="text-sm text-gray-600">
                Get browser push notifications
              </P>
            </Div>
            <Label devId="push-toggle-label" className="relative inline-flex items-center cursor-pointer">
              <Input
                devId="push-toggle-input"
                type="checkbox"
                className="sr-only peer"
                checked={pushNotifications}
                onChange={(e) => onPushChange(e.target.checked)}
              />
              <Div devId="push-toggle-switch" className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></Div>
            </Label>
          </Div>
        </Div>
      </Card>
    </Container>
  );
};