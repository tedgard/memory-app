import { describe, it, expect, beforeEach } from 'vitest'
import { useUserStore } from '@/store/useUserStore'

describe('useUserStore', () => {
  beforeEach(() => {
    useUserStore.getState().resetProfile()
  })

  describe('createProfile', () => {
    it('should create a new user profile', () => {
      const { createProfile, profile } = useUserStore.getState()

      createProfile('Test User', 'improve-memory', 'beginner')

      const newProfile = useUserStore.getState().profile
      expect(newProfile).toBeTruthy()
      expect(newProfile?.name).toBe('Test User')
      expect(newProfile?.goal).toBe('improve-memory')
      expect(newProfile?.experienceLevel).toBe('beginner')
      expect(newProfile?.onboardingCompleted).toBe(false)
      expect(newProfile?.id).toBeTruthy()
    })

    it('should set default preferences', () => {
      const { createProfile } = useUserStore.getState()

      createProfile('Test User', 'boost-iq', 'intermediate')

      const profile = useUserStore.getState().profile
      expect(profile?.preferences.soundEnabled).toBe(true)
      expect(profile?.preferences.volume).toBe(0.7)
      expect(profile?.preferences.notificationsEnabled).toBe(false)
      expect(profile?.preferences.theme).toBe('dark')
      expect(profile?.preferences.language).toBe('en')
    })
  })

  describe('updateProfile', () => {
    it('should update profile fields', () => {
      const { createProfile, updateProfile } = useUserStore.getState()

      createProfile('Test User', 'improve-memory', 'beginner')
      updateProfile({ name: 'Updated Name' })

      const profile = useUserStore.getState().profile
      expect(profile?.name).toBe('Updated Name')
    })

    it('should not update if profile does not exist', () => {
      const { updateProfile, profile } = useUserStore.getState()

      updateProfile({ name: 'Test' })

      expect(profile).toBeNull()
    })

    it('should update nested preferences', () => {
      const { createProfile, updateProfile } = useUserStore.getState()

      createProfile('Test User', 'improve-memory', 'beginner')
      updateProfile({
        preferences: {
          ...useUserStore.getState().profile!.preferences,
          soundEnabled: false
        }
      })

      const profile = useUserStore.getState().profile
      expect(profile?.preferences.soundEnabled).toBe(false)
    })
  })

  describe('completeOnboarding', () => {
    it('should mark onboarding as completed', () => {
      const { createProfile, completeOnboarding } = useUserStore.getState()

      createProfile('Test User', 'improve-memory', 'beginner')
      expect(useUserStore.getState().profile?.onboardingCompleted).toBe(false)

      completeOnboarding()
      expect(useUserStore.getState().profile?.onboardingCompleted).toBe(true)
    })

    it('should not error if profile does not exist', () => {
      const { completeOnboarding } = useUserStore.getState()

      expect(() => completeOnboarding()).not.toThrow()
    })
  })

  describe('addXP', () => {
    it('should add XP without leveling up', () => {
      const { addXP, level } = useUserStore.getState()

      addXP(50)

      const newLevel = useUserStore.getState().level
      expect(newLevel.currentXP).toBe(50)
      expect(newLevel.totalXP).toBe(50)
      expect(newLevel.currentLevel).toBe(1)
    })

    it('should level up when XP threshold is reached', () => {
      const { addXP } = useUserStore.getState()

      // Level 1 requires 100 XP to level up
      addXP(100)

      const level = useUserStore.getState().level
      expect(level.currentLevel).toBe(2)
      expect(level.currentXP).toBe(0)
      expect(level.totalXP).toBe(100)
    })

    it('should level up multiple times with enough XP', () => {
      const { addXP } = useUserStore.getState()

      // Add enough XP for multiple levels
      addXP(500)

      const level = useUserStore.getState().level
      expect(level.currentLevel).toBeGreaterThan(1)
      expect(level.totalXP).toBe(500)
    })

    it('should correctly handle XP overflow', () => {
      const { addXP } = useUserStore.getState()

      // Level 1 requires 100 XP, add 150
      addXP(150)

      const level = useUserStore.getState().level
      expect(level.currentLevel).toBe(2)
      expect(level.currentXP).toBe(50)
      expect(level.totalXP).toBe(150)
    })
  })

  describe('updateStreak', () => {
    it('should start streak on first activity', () => {
      const { updateStreak } = useUserStore.getState()

      updateStreak()

      const streak = useUserStore.getState().streak
      expect(streak.current).toBe(1)
      expect(streak.longest).toBe(1)
      expect(streak.lastActivityDate).toBeTruthy()
    })

    it('should not change streak on same day', () => {
      const { updateStreak } = useUserStore.getState()

      updateStreak()
      const firstStreak = useUserStore.getState().streak

      updateStreak()
      const secondStreak = useUserStore.getState().streak

      expect(secondStreak.current).toBe(firstStreak.current)
      expect(secondStreak.longest).toBe(firstStreak.longest)
    })

    it('should increment streak on consecutive day', () => {
      const { updateStreak, streak } = useUserStore.getState()

      // Set last activity to yesterday
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      yesterday.setHours(0, 0, 0, 0)

      useUserStore.setState({
        streak: {
          ...streak,
          current: 1,
          longest: 1,
          lastActivityDate: yesterday,
        },
      })

      updateStreak()

      const newStreak = useUserStore.getState().streak
      expect(newStreak.current).toBe(2)
      expect(newStreak.longest).toBe(2)
    })

    it('should reset streak if more than one day gap', () => {
      const { updateStreak, streak } = useUserStore.getState()

      // Set last activity to 3 days ago
      const threeDaysAgo = new Date()
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
      threeDaysAgo.setHours(0, 0, 0, 0)

      useUserStore.setState({
        streak: {
          ...streak,
          current: 5,
          longest: 10,
          lastActivityDate: threeDaysAgo,
        },
      })

      updateStreak()

      const newStreak = useUserStore.getState().streak
      expect(newStreak.current).toBe(1)
      expect(newStreak.longest).toBe(10) // Longest should remain unchanged
    })

    it('should update longest streak when current exceeds it', () => {
      const { updateStreak, streak } = useUserStore.getState()

      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      yesterday.setHours(0, 0, 0, 0)

      useUserStore.setState({
        streak: {
          ...streak,
          current: 10,
          longest: 10,
          lastActivityDate: yesterday,
        },
      })

      updateStreak()

      const newStreak = useUserStore.getState().streak
      expect(newStreak.current).toBe(11)
      expect(newStreak.longest).toBe(11)
    })
  })

  describe('freeze cards', () => {
    it('should add a freeze card', () => {
      const { addFreezeCard } = useUserStore.getState()

      addFreezeCard()

      const streak = useUserStore.getState().streak
      expect(streak.freezeCards).toBe(1)
    })

    it('should use a freeze card', () => {
      const { addFreezeCard, useFreezeCard } = useUserStore.getState()

      addFreezeCard()
      addFreezeCard()
      expect(useUserStore.getState().streak.freezeCards).toBe(2)

      useFreezeCard()
      expect(useUserStore.getState().streak.freezeCards).toBe(1)
    })

    it('should not use freeze card if none available', () => {
      const { useFreezeCard } = useUserStore.getState()

      expect(useUserStore.getState().streak.freezeCards).toBe(0)

      useFreezeCard()
      expect(useUserStore.getState().streak.freezeCards).toBe(0)
    })
  })

  describe('resetProfile', () => {
    it('should reset all user data', () => {
      const { createProfile, addXP, updateStreak, resetProfile } = useUserStore.getState()

      createProfile('Test User', 'improve-memory', 'beginner')
      addXP(100)
      updateStreak()

      resetProfile()

      const state = useUserStore.getState()
      expect(state.profile).toBeNull()
      expect(state.level.currentLevel).toBe(1)
      expect(state.level.currentXP).toBe(0)
      expect(state.streak.current).toBe(0)
      expect(state.streak.longest).toBe(0)
    })
  })
})
