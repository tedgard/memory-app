import { describe, it, expect, beforeEach } from 'vitest'
import { useSettingsStore } from '@/store/useSettingsStore'

describe('useSettingsStore', () => {
  beforeEach(() => {
    useSettingsStore.getState().resetSettings()
  })

  describe('initial state', () => {
    it('should have correct default values', () => {
      const state = useSettingsStore.getState()

      expect(state.soundEnabled).toBe(true)
      expect(state.volume).toBe(0.7)
      expect(state.notificationsEnabled).toBe(false)
      expect(state.reminderTime).toBeNull()
      expect(state.theme).toBe('dark')
      expect(state.language).toBe('en')
    })
  })

  describe('toggleSound', () => {
    it('should toggle sound on and off', () => {
      const { toggleSound } = useSettingsStore.getState()

      expect(useSettingsStore.getState().soundEnabled).toBe(true)

      toggleSound()
      expect(useSettingsStore.getState().soundEnabled).toBe(false)

      toggleSound()
      expect(useSettingsStore.getState().soundEnabled).toBe(true)
    })
  })

  describe('setVolume', () => {
    it('should set volume to valid value', () => {
      const { setVolume } = useSettingsStore.getState()

      setVolume(0.5)
      expect(useSettingsStore.getState().volume).toBe(0.5)
    })

    it('should clamp volume to 0 minimum', () => {
      const { setVolume } = useSettingsStore.getState()

      setVolume(-0.5)
      expect(useSettingsStore.getState().volume).toBe(0)
    })

    it('should clamp volume to 1 maximum', () => {
      const { setVolume } = useSettingsStore.getState()

      setVolume(1.5)
      expect(useSettingsStore.getState().volume).toBe(1)
    })

    it('should allow 0 volume', () => {
      const { setVolume } = useSettingsStore.getState()

      setVolume(0)
      expect(useSettingsStore.getState().volume).toBe(0)
    })

    it('should allow maximum volume of 1', () => {
      const { setVolume } = useSettingsStore.getState()

      setVolume(1)
      expect(useSettingsStore.getState().volume).toBe(1)
    })
  })

  describe('toggleNotifications', () => {
    it('should toggle notifications on and off', () => {
      const { toggleNotifications } = useSettingsStore.getState()

      expect(useSettingsStore.getState().notificationsEnabled).toBe(false)

      toggleNotifications()
      expect(useSettingsStore.getState().notificationsEnabled).toBe(true)

      toggleNotifications()
      expect(useSettingsStore.getState().notificationsEnabled).toBe(false)
    })
  })

  describe('setReminderTime', () => {
    it('should set reminder time', () => {
      const { setReminderTime } = useSettingsStore.getState()

      setReminderTime('09:00')
      expect(useSettingsStore.getState().reminderTime).toBe('09:00')
    })

    it('should clear reminder time', () => {
      const { setReminderTime } = useSettingsStore.getState()

      setReminderTime('09:00')
      expect(useSettingsStore.getState().reminderTime).toBe('09:00')

      setReminderTime(null)
      expect(useSettingsStore.getState().reminderTime).toBeNull()
    })
  })

  describe('setTheme', () => {
    it('should set theme to light', () => {
      const { setTheme } = useSettingsStore.getState()

      setTheme('light')
      expect(useSettingsStore.getState().theme).toBe('light')
    })

    it('should set theme to dark', () => {
      const { setTheme } = useSettingsStore.getState()

      setTheme('dark')
      expect(useSettingsStore.getState().theme).toBe('dark')
    })

    it('should set theme to auto', () => {
      const { setTheme } = useSettingsStore.getState()

      setTheme('auto')
      expect(useSettingsStore.getState().theme).toBe('auto')
    })
  })

  describe('setLanguage', () => {
    it('should set language', () => {
      const { setLanguage } = useSettingsStore.getState()

      setLanguage('es')
      expect(useSettingsStore.getState().language).toBe('es')
    })

    it('should change language multiple times', () => {
      const { setLanguage } = useSettingsStore.getState()

      setLanguage('fr')
      expect(useSettingsStore.getState().language).toBe('fr')

      setLanguage('de')
      expect(useSettingsStore.getState().language).toBe('de')
    })
  })

  describe('resetSettings', () => {
    it('should reset all settings to defaults', () => {
      const { toggleSound, setVolume, toggleNotifications, setReminderTime, setTheme, setLanguage, resetSettings } = useSettingsStore.getState()

      // Change all settings
      toggleSound()
      setVolume(0.3)
      toggleNotifications()
      setReminderTime('08:00')
      setTheme('light')
      setLanguage('fr')

      // Verify settings changed
      expect(useSettingsStore.getState().soundEnabled).toBe(false)
      expect(useSettingsStore.getState().volume).toBe(0.3)
      expect(useSettingsStore.getState().notificationsEnabled).toBe(true)
      expect(useSettingsStore.getState().reminderTime).toBe('08:00')
      expect(useSettingsStore.getState().theme).toBe('light')
      expect(useSettingsStore.getState().language).toBe('fr')

      // Reset
      resetSettings()

      // Verify reset to defaults
      const state = useSettingsStore.getState()
      expect(state.soundEnabled).toBe(true)
      expect(state.volume).toBe(0.7)
      expect(state.notificationsEnabled).toBe(false)
      expect(state.reminderTime).toBeNull()
      expect(state.theme).toBe('dark')
      expect(state.language).toBe('en')
    })
  })
})
