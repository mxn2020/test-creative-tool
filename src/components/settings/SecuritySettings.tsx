// src/components/settings/SecuritySettings.tsx

import React from 'react';
import { 
  Container, 
  Card, 
  Div, 
  H2, 
  P, 
  Button, 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/lib/dev-container';
import { Shield } from 'lucide-react';

interface SecuritySettingsProps {
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  onEnable2FA: () => void;
  onSessionTimeoutChange: (value: number) => void;
}

export const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  twoFactorEnabled,
  sessionTimeout,
  onEnable2FA,
  onSessionTimeoutChange,
}) => {
  return (
    <Container componentId="security-settings">
      <Card devId="security-settings-card" className="p-6">
        <Div devId="security-settings-header" className="flex items-center gap-3 mb-4">
          <Shield className="h-5 w-5 text-gray-600" />
          <H2 devId="security-settings-title" className="text-xl font-semibold">Security</H2>
        </Div>
        <Div devId="security-settings-content" className="space-y-4">
          <Div devId="2fa-field" className="flex items-center justify-between">
            <Div devId="2fa-info">
              <P devId="2fa-title" className="font-medium">Two-Factor Authentication</P>
              <P devId="2fa-desc" className="text-sm text-gray-600">
                Add an extra layer of security to your account
              </P>
            </Div>
            <Button 
              devId="enable-2fa-button" 
              variant="outline" 
              size="sm"
              onClick={onEnable2FA}
              disabled={twoFactorEnabled}
            >
              {twoFactorEnabled ? 'Enabled' : 'Enable'}
            </Button>
          </Div>
          <Div devId="session-timeout-field" className="flex items-center justify-between">
            <Div devId="session-timeout-info">
              <P devId="session-timeout-title" className="font-medium">Session Timeout</P>
              <P devId="session-timeout-desc" className="text-sm text-gray-600">
                Automatically log out after inactivity
              </P>
            </Div>
            <Select
              devId="session-timeout-select"
              value={sessionTimeout.toString()}
              onValueChange={(value) => onSessionTimeoutChange(parseInt(value))}
            >
              <SelectTrigger devId="session-timeout-trigger" className="w-[150px]">
                <SelectValue devId="session-timeout-value" />
              </SelectTrigger>
              <SelectContent devId="session-timeout-content">
                <SelectItem devId="timeout-30" value="30">30 minutes</SelectItem>
                <SelectItem devId="timeout-60" value="60">1 hour</SelectItem>
                <SelectItem devId="timeout-120" value="120">2 hours</SelectItem>
                <SelectItem devId="timeout-never" value="0">Never</SelectItem>
              </SelectContent>
            </Select>
          </Div>
        </Div>
      </Card>
    </Container>
  );
};