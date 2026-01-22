import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import App from '@/App'
import { useUserStore } from '@/store/useUserStore'
import { useSettingsStore } from '@/store/useSettingsStore'

describe('App', () => {
  beforeEach(() => {
    useUserStore.getState().resetProfile()
    useSettingsStore.setState({ theme: 'dark' })
    // Clean up document classes
    document.documentElement.classList.remove('light', 'dark')
  })

  it('should show onboarding flow for new users', () => {
    render(<App />)

    expect(screen.getByText(/Welcome to MemoryApp 🧠/)).toBeInTheDocument()
  })

  it('should show dashboard after onboarding completed', () => {
    // Set the profile directly in the store state before rendering
    useUserStore.setState({
      profile: {
        id: 'test-id',
        name: 'Test User',
        createdAt: new Date(),
        goal: 'memory',
        experienceLevel: 'beginner',
        onboardingCompleted: true,
        preferences: {
          soundEnabled: true,
          volume: 0.7,
          notificationsEnabled: false,
          reminderTime: null,
          theme: 'dark',
          language: 'en',
        },
      },
      level: {
        currentLevel: 1,
        currentXP: 0,
        xpToNextLevel: 100,
        totalXP: 0,
      },
      streak: {
        current: 0,
        longest: 0,
        lastActivityDate: null,
        streakMilestones: [7, 14, 30],
        freezeCards: 0,
      },
    })

    const { container } = render(<App />)

    // Profile is created, should not show onboarding
    expect(screen.queryByText(/Welcome to MemoryApp 🧠/)).not.toBeInTheDocument()
    // Should show navigation from MainLayout
    expect(container.querySelector('nav')).toBeInTheDocument()
  })

  it('should apply dark theme to document element', () => {
    useSettingsStore.setState({ theme: 'dark' })
    useUserStore.setState({
      profile: {
        id: 'test-id',
        name: 'Test User',
        createdAt: new Date(),
        goal: 'memory',
        experienceLevel: 'beginner',
        onboardingCompleted: true,
        preferences: {
          soundEnabled: true,
          volume: 0.7,
          notificationsEnabled: false,
          reminderTime: null,
          theme: 'dark',
          language: 'en',
        },
      },
      level: {
        currentLevel: 1,
        currentXP: 0,
        xpToNextLevel: 100,
        totalXP: 0,
      },
      streak: {
        current: 0,
        longest: 0,
        lastActivityDate: null,
        streakMilestones: [7, 14, 30],
        freezeCards: 0,
      },
    })

    render(<App />)

    waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(true)
      expect(document.documentElement.classList.contains('light')).toBe(false)
    })
  })

  it('should apply light theme to document element', () => {
    useSettingsStore.setState({ theme: 'light' })
    useUserStore.setState({
      profile: {
        id: 'test-id',
        name: 'Test User',
        createdAt: new Date(),
        goal: 'memory',
        experienceLevel: 'beginner',
        onboardingCompleted: true,
        preferences: {
          soundEnabled: true,
          volume: 0.7,
          notificationsEnabled: false,
          reminderTime: null,
          theme: 'dark',
          language: 'en',
        },
      },
      level: {
        currentLevel: 1,
        currentXP: 0,
        xpToNextLevel: 100,
        totalXP: 0,
      },
      streak: {
        current: 0,
        longest: 0,
        lastActivityDate: null,
        streakMilestones: [7, 14, 30],
        freezeCards: 0,
      },
    })

    render(<App />)

    waitFor(() => {
      expect(document.documentElement.classList.contains('light')).toBe(true)
      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })
  })

  it('should handle auto theme based on system preference', () => {
    useSettingsStore.setState({ theme: 'auto' })
    useUserStore.setState({
      profile: {
        id: 'test-id',
        name: 'Test User',
        createdAt: new Date(),
        goal: 'memory',
        experienceLevel: 'beginner',
        onboardingCompleted: true,
        preferences: {
          soundEnabled: true,
          volume: 0.7,
          notificationsEnabled: false,
          reminderTime: null,
          theme: 'dark',
          language: 'en',
        },
      },
      level: {
        currentLevel: 1,
        currentXP: 0,
        xpToNextLevel: 100,
        totalXP: 0,
      },
      streak: {
        current: 0,
        longest: 0,
        lastActivityDate: null,
        streakMilestones: [7, 14, 30],
        freezeCards: 0,
      },
    })

    render(<App />)

    // Auto theme will apply based on matchMedia mock in setup.ts
    waitFor(() => {
      const hasDarkOrLight =
        document.documentElement.classList.contains('dark') ||
        document.documentElement.classList.contains('light')
      expect(hasDarkOrLight).toBe(true)
    })
  })

  it('should render main layout when onboarding is complete', () => {
    useUserStore.setState({
      profile: {
        id: 'test-id',
        name: 'Test User',
        createdAt: new Date(),
        goal: 'memory',
        experienceLevel: 'beginner',
        onboardingCompleted: true,
        preferences: {
          soundEnabled: true,
          volume: 0.7,
          notificationsEnabled: false,
          reminderTime: null,
          theme: 'dark',
          language: 'en',
        },
      },
      level: {
        currentLevel: 1,
        currentXP: 0,
        xpToNextLevel: 100,
        totalXP: 0,
      },
      streak: {
        current: 0,
        longest: 0,
        lastActivityDate: null,
        streakMilestones: [7, 14, 30],
        freezeCards: 0,
      },
    })

    const { container } = render(<App />)

    // MainLayout should render with navigation
    expect(container.querySelector('nav')).toBeInTheDocument()
  })
})
