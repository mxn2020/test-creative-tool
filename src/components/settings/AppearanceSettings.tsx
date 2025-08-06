// src/components/settings/AppearanceSettings.tsx

import React from 'react';
import { 
  Container, 
  Card, 
  Div, 
  H2, 
  Label, 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/lib/dev-container';
import { Moon } from 'lucide-react';

interface AppearanceSettingsProps {
  theme: 'light' | 'dark' | 'system';
  onThemeChange: (value: 'light' | 'dark' | 'system') => void;
}

export const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  theme,
  onThemeChange,
}) => {
  return (
    <Container componentId="appearance-settings">
      <Card devId="appearance-settings-card" className="p-6">
        <Div devId="appearance-settings-header" className="flex items-center gap-3 mb-4">
          <Moon className="h-5 w-5 text-gray-600" />
          <H2 devId="appearance-settings-title" className="text-xl font-semibold">Appearance</H2>
        </Div>
        <Div devId="appearance-settings-content" className="space-y-4">
          <Div devId="theme-field">
            <Label devId="theme-label" htmlFor="theme">Theme</Label>
            <Select
              devId="theme-select"
              value={theme}
              onValueChange={onThemeChange}
            >
              <SelectTrigger devId="theme-select-trigger" className="mt-1 w-full">
                <SelectValue devId="theme-select-value" />
              </SelectTrigger>
              <SelectContent devId="theme-select-content">
                <SelectItem devId="theme-select-light" value="light">Light</SelectItem>
                <SelectItem devId="theme-select-dark" value="dark">Dark</SelectItem>
                <SelectItem devId="theme-select-system" value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </Div>
        </Div>
      </Card>
    </Container>
  );
};