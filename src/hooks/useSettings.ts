// src/hooks/useSettings.ts

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface AppSettings {
  appName: string;
  appUrl: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  theme: 'light' | 'dark' | 'system';
  twoFactorEnabled: boolean;
  sessionTimeout: number;
}

const defaultSettings: AppSettings = {
  appName: '',
  appUrl: '',
  emailNotifications: true,
  pushNotifications: false,
  theme: 'system',
  twoFactorEnabled: false,
  sessionTimeout: 60,
};

export const settingsKeys = {
  all: ['settings'] as const,
  current: () => [...settingsKeys.all, 'current'] as const,
};

async function fetchSettings(): Promise<AppSettings> {
  try {
    const response = await fetch('/api/settings');
    if (!response.ok) throw new Error('Failed to fetch settings');
    return response.json();
  } catch {
    // Return default settings if fetch fails
    return defaultSettings;
  }
}

async function updateSettings(settings: AppSettings): Promise<AppSettings> {
  const response = await fetch('/api/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  });
  if (!response.ok) throw new Error('Failed to update settings');
  return response.json();
}

export function useSettings() {
  const queryClient = useQueryClient();
  const [localSettings, setLocalSettings] = useState<AppSettings>(defaultSettings);

  const { data: settingsData = defaultSettings, isLoading } = useQuery({
    queryKey: settingsKeys.current(),
    queryFn: fetchSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    if (settingsData) {
      setLocalSettings(settingsData);
    }
  }, [settingsData]);

  const mutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: (data) => {
      queryClient.setQueryData(settingsKeys.current(), data);
      setLocalSettings(data);
    },
  });

  const updateSetting = <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    mutation.mutate(localSettings);
  };

  return {
    settings: localSettings,
    isLoading,
    isSaving: mutation.isPending,
    error: mutation.error?.message,
    updateSetting,
    saveSettings,
  };
}