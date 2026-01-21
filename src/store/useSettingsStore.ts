import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  soundEnabled: boolean;
  volume: number; // 0-1
  notificationsEnabled: boolean;
  reminderTime: string | null;
  theme: 'light' | 'dark' | 'auto';
  language: string;

  // Actions
  toggleSound: () => void;
  setVolume: (volume: number) => void;
  toggleNotifications: () => void;
  setReminderTime: (time: string | null) => void;
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  setLanguage: (language: string) => void;
  resetSettings: () => void;
}

const defaultSettings = {
  soundEnabled: true,
  volume: 0.7,
  notificationsEnabled: false,
  reminderTime: null,
  theme: 'dark' as const,
  language: 'en',
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,

      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

      setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),

      toggleNotifications: () => set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),

      setReminderTime: (time) => set({ reminderTime: time }),

      setTheme: (theme) => set({ theme }),

      setLanguage: (language) => set({ language }),

      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'memory-app-settings',
    }
  )
);
