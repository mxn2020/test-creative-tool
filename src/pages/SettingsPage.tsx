// src/pages/SettingsPage.tsx

import { Container } from '../lib/dev-container';
import { useSettings } from '@/hooks/useSettings';
import { SettingsHeader } from '@/components/settings/SettingsHeader';
import { GeneralSettings } from '@/components/settings/GeneralSettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { AppearanceSettings } from '@/components/settings/AppearanceSettings';
import { SecuritySettings } from '@/components/settings/SecuritySettings';
import { SettingsActions } from '@/components/settings/SettingsActions';

export function SettingsPage() {
  const { settings, isSaving, updateSetting, saveSettings } = useSettings();

  const handleEnable2FA = () => {
    // This would typically open a modal or redirect to 2FA setup
    updateSetting('twoFactorEnabled', true);
  };

  return (
    <Container componentId="settings-page" className="space-y-6">
      <SettingsHeader />
      
      <GeneralSettings
        appName={settings.appName}
        appUrl={settings.appUrl}
        onAppNameChange={(value) => updateSetting('appName', value)}
        onAppUrlChange={(value) => updateSetting('appUrl', value)}
      />

      <NotificationSettings
        emailNotifications={settings.emailNotifications}
        pushNotifications={settings.pushNotifications}
        onEmailChange={(value) => updateSetting('emailNotifications', value)}
        onPushChange={(value) => updateSetting('pushNotifications', value)}
      />

      <AppearanceSettings
        theme={settings.theme}
        onThemeChange={(value) => updateSetting('theme', value)}
      />

      <SecuritySettings
        twoFactorEnabled={settings.twoFactorEnabled}
        sessionTimeout={settings.sessionTimeout}
        onEnable2FA={handleEnable2FA}
        onSessionTimeoutChange={(value) => updateSetting('sessionTimeout', value)}
      />

      <SettingsActions onSave={saveSettings} isSaving={isSaving} />
    </Container>
  );
}