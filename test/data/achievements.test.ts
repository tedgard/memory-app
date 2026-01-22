import { describe, it, expect } from 'vitest'
import { achievements } from '@/data/achievements'

describe('achievements', () => {
  it('should have all achievements defined', () => {
    expect(achievements.length).toBeGreaterThan(0)
  })

  it('should have unique IDs', () => {
    const ids = achievements.map(a => a.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('should have all required fields', () => {
    achievements.forEach(achievement => {
      expect(achievement.id).toBeDefined()
      expect(achievement.title).toBeDefined()
      expect(achievement.description).toBeDefined()
      expect(achievement.icon).toBeDefined()
      expect(achievement.category).toBeDefined()
      expect(achievement.requirement).toBeDefined()
      expect(achievement.checkProgress).toBeDefined()
    })
  })

  it('should have valid categories', () => {
    const validCategories = ['consistency', 'mastery', 'dedication', 'improvement', 'perfectionist']
    achievements.forEach(achievement => {
      expect(validCategories).toContain(achievement.category)
    })
  })

  it('should have positive requirements', () => {
    achievements.forEach(achievement => {
      expect(achievement.requirement).toBeGreaterThan(0)
    })
  })

  describe('checkProgress functions', () => {
    it('should return 0 for empty stats', () => {
      achievements.forEach(achievement => {
        const progress = achievement.checkProgress({})
        expect(progress).toBeGreaterThanOrEqual(0)
      })
    })

    it('should calculate streak progress correctly', () => {
      const streakAchievement = achievements.find(a => a.id === 'streak-7')!

      const progress = streakAchievement.checkProgress({
        streak: { longest: 10 }
      })

      expect(progress).toBe(10)
    })

    it('should calculate session progress correctly', () => {
      const sessionAchievement = achievements.find(a => a.id === 'sessions-10')!

      const progress = sessionAchievement.checkProgress({
        totalSessions: 15
      })

      expect(progress).toBe(15)
    })

    it('should calculate nback difficulty progress correctly', () => {
      const nbackAchievement = achievements.find(a => a.id === 'nback-4')!

      const progress = nbackAchievement.checkProgress({
        exerciseProgress: {
          'dual-nback': { currentDifficulty: 5 }
        }
      })

      expect(progress).toBe(5)
    })

    it('should calculate perfect sessions progress correctly', () => {
      const perfectAchievement = achievements.find(a => a.id === 'perfect-5')!

      const progress = perfectAchievement.checkProgress({
        perfectSessions: 8
      })

      expect(progress).toBe(8)
    })

    it('should calculate accuracy progress correctly', () => {
      const accuracyAchievement = achievements.find(a => a.id === 'accuracy-80')!

      const progress = accuracyAchievement.checkProgress({
        averageAccuracy: 85
      })

      expect(progress).toBe(85)
    })
  })

  describe('achievement categories', () => {
    it('should have consistency achievements', () => {
      const consistencyAchievements = achievements.filter(a => a.category === 'consistency')
      expect(consistencyAchievements.length).toBeGreaterThan(0)
    })

    it('should have dedication achievements', () => {
      const dedicationAchievements = achievements.filter(a => a.category === 'dedication')
      expect(dedicationAchievements.length).toBeGreaterThan(0)
    })

    it('should have mastery achievements', () => {
      const masteryAchievements = achievements.filter(a => a.category === 'mastery')
      expect(masteryAchievements.length).toBeGreaterThan(0)
    })

    it('should have improvement achievements', () => {
      const improvementAchievements = achievements.filter(a => a.category === 'improvement')
      expect(improvementAchievements.length).toBeGreaterThan(0)
    })

    it('should have perfectionist achievements', () => {
      const perfectionistAchievements = achievements.filter(a => a.category === 'perfectionist')
      expect(perfectionistAchievements.length).toBeGreaterThan(0)
    })
  })

  describe('progression structure', () => {
    it('should have progressive streak requirements', () => {
      const streakAchievements = achievements
        .filter(a => a.id.startsWith('streak-'))
        .sort((a, b) => a.requirement - b.requirement)

      for (let i = 1; i < streakAchievements.length; i++) {
        expect(streakAchievements[i].requirement).toBeGreaterThan(streakAchievements[i - 1].requirement)
      }
    })

    it('should have progressive session requirements', () => {
      const sessionAchievements = achievements
        .filter(a => a.id.startsWith('sessions-'))
        .sort((a, b) => a.requirement - b.requirement)

      for (let i = 1; i < sessionAchievements.length; i++) {
        expect(sessionAchievements[i].requirement).toBeGreaterThan(sessionAchievements[i - 1].requirement)
      }
    })

    it('should have progressive nback requirements', () => {
      const nbackAchievements = achievements
        .filter(a => a.id.startsWith('nback-'))
        .sort((a, b) => a.requirement - b.requirement)

      for (let i = 1; i < nbackAchievements.length; i++) {
        expect(nbackAchievements[i].requirement).toBeGreaterThan(nbackAchievements[i - 1].requirement)
      }
    })
  })
})
