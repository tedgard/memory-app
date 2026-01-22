import { describe, it, expect, beforeEach } from 'vitest'
import { useProgressStore } from '@/store/useProgressStore'
import type { SessionMetrics } from '@/types/exercise'

describe('useProgressStore', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
  })

  const createMockSession = (overrides?: Partial<SessionMetrics>): SessionMetrics => ({
    id: crypto.randomUUID(),
    exerciseType: 'dual-nback',
    score: 100,
    accuracy: 85,
    duration: 300,
    timestamp: new Date(),
    difficulty: 2,
    trialsCompleted: 20,
    reactionTime: 500,
    ...overrides,
  })

  describe('addSession', () => {
    it('should add a session to the sessions array', () => {
      const { addSession } = useProgressStore.getState()
      const session = createMockSession()

      addSession(session)

      const sessions = useProgressStore.getState().sessions
      expect(sessions).toHaveLength(1)
      expect(sessions[0]).toEqual(session)
    })

    it('should update global stats', () => {
      const { addSession } = useProgressStore.getState()
      const session = createMockSession({ accuracy: 90, duration: 300 })

      addSession(session)

      const stats = useProgressStore.getState().stats
      expect(stats.totalSessions).toBe(1)
      expect(stats.totalTime).toBe(5) // 300 seconds = 5 minutes
      expect(stats.averageAccuracy).toBe(90)
    })

    it('should track perfect sessions', () => {
      const { addSession } = useProgressStore.getState()

      addSession(createMockSession({ accuracy: 100 }))
      addSession(createMockSession({ accuracy: 85 }))
      addSession(createMockSession({ accuracy: 100 }))

      const stats = useProgressStore.getState().stats
      expect(stats.perfectSessions).toBe(2)
    })

    it('should update exercise-specific stats', () => {
      const { addSession } = useProgressStore.getState()
      const session = createMockSession({
        exerciseType: 'dual-nback',
        score: 150,
        accuracy: 88,
        duration: 600,
      })

      addSession(session)

      const exerciseStats = useProgressStore.getState().stats.exerciseProgress['dual-nback']
      expect(exerciseStats.totalSessions).toBe(1)
      expect(exerciseStats.totalTime).toBe(10) // 600 seconds = 10 minutes
      expect(exerciseStats.averageAccuracy).toBe(88)
      expect(exerciseStats.averageScore).toBe(150)
      expect(exerciseStats.bestScore).toBe(150)
    })

    it('should calculate average accuracy correctly over multiple sessions', () => {
      const { addSession } = useProgressStore.getState()

      addSession(createMockSession({ exerciseType: 'dual-nback', accuracy: 80 }))
      addSession(createMockSession({ exerciseType: 'dual-nback', accuracy: 90 }))
      addSession(createMockSession({ exerciseType: 'dual-nback', accuracy: 70 }))

      const exerciseStats = useProgressStore.getState().stats.exerciseProgress['dual-nback']
      expect(exerciseStats.averageAccuracy).toBe(80) // (80 + 90 + 70) / 3
    })

    it('should track best score correctly', () => {
      const { addSession } = useProgressStore.getState()

      addSession(createMockSession({ exerciseType: 'dual-nback', score: 100 }))
      addSession(createMockSession({ exerciseType: 'dual-nback', score: 200 }))
      addSession(createMockSession({ exerciseType: 'dual-nback', score: 150 }))

      const exerciseStats = useProgressStore.getState().stats.exerciseProgress['dual-nback']
      expect(exerciseStats.bestScore).toBe(200)
    })

    it('should update daily timeline', () => {
      const { addSession } = useProgressStore.getState()
      const session = createMockSession()

      addSession(session)

      const timeline = useProgressStore.getState().timeline
      const dateKey = new Date(session.timestamp).toISOString().split('T')[0]

      expect(timeline.daily[dateKey]).toBeDefined()
      expect(timeline.daily[dateKey].sessions).toHaveLength(1)
      expect(timeline.daily[dateKey].totalTime).toBe(5) // 300 seconds = 5 minutes
    })

    it('should aggregate multiple sessions on the same day', () => {
      const { addSession } = useProgressStore.getState()
      const today = new Date()

      addSession(createMockSession({ timestamp: today, duration: 300 }))
      addSession(createMockSession({ timestamp: today, duration: 600 }))

      const timeline = useProgressStore.getState().timeline
      const dateKey = today.toISOString().split('T')[0]

      expect(timeline.daily[dateKey].sessions).toHaveLength(2)
      expect(timeline.daily[dateKey].totalTime).toBe(15) // 900 seconds = 15 minutes
    })
  })

  describe('adaptive difficulty', () => {
    it('should increase difficulty when accuracy is >= 85%', () => {
      const { addSession } = useProgressStore.getState()

      addSession(createMockSession({
        exerciseType: 'dual-nback',
        accuracy: 90,
        difficulty: 2,
      }))

      const exerciseStats = useProgressStore.getState().stats.exerciseProgress['dual-nback']
      expect(exerciseStats.currentDifficulty).toBe(3)
    })

    it('should decrease difficulty when accuracy is < 60%', () => {
      const { addSession } = useProgressStore.getState()

      addSession(createMockSession({
        exerciseType: 'dual-nback',
        accuracy: 50,
        difficulty: 3,
      }))

      const exerciseStats = useProgressStore.getState().stats.exerciseProgress['dual-nback']
      expect(exerciseStats.currentDifficulty).toBe(2)
    })

    it('should not change difficulty for accuracy between 60-85%', () => {
      const { addSession } = useProgressStore.getState()

      addSession(createMockSession({
        exerciseType: 'dual-nback',
        accuracy: 75,
        difficulty: 3,
      }))

      const exerciseStats = useProgressStore.getState().stats.exerciseProgress['dual-nback']
      expect(exerciseStats.currentDifficulty).toBe(2) // Initial difficulty
    })

    it('should not decrease below minimum difficulty for dual-nback', () => {
      const { addSession } = useProgressStore.getState()

      addSession(createMockSession({
        exerciseType: 'dual-nback',
        accuracy: 30,
        difficulty: 2,
      }))

      const exerciseStats = useProgressStore.getState().stats.exerciseProgress['dual-nback']
      expect(exerciseStats.currentDifficulty).toBe(2) // Should not go below 2
    })

    it('should not decrease below minimum difficulty for sequence-memory', () => {
      const { addSession } = useProgressStore.getState()

      addSession(createMockSession({
        exerciseType: 'sequence-memory',
        accuracy: 30,
        difficulty: 3,
      }))

      const exerciseStats = useProgressStore.getState().stats.exerciseProgress['sequence-memory']
      expect(exerciseStats.currentDifficulty).toBe(3) // Should not go below 3
    })

    it('should not increase above maximum difficulty', () => {
      const { addSession } = useProgressStore.getState()

      // Set difficulty to max
      useProgressStore.setState({
        stats: {
          ...useProgressStore.getState().stats,
          exerciseProgress: {
            ...useProgressStore.getState().stats.exerciseProgress,
            'dual-nback': {
              ...useProgressStore.getState().stats.exerciseProgress['dual-nback'],
              currentDifficulty: 10,
            },
          },
        },
      })

      addSession(createMockSession({
        exerciseType: 'dual-nback',
        accuracy: 95,
        difficulty: 10,
      }))

      const exerciseStats = useProgressStore.getState().stats.exerciseProgress['dual-nback']
      expect(exerciseStats.currentDifficulty).toBe(10) // Should not exceed 10
    })
  })

  describe('getExerciseStats', () => {
    it('should return stats for specific exercise', () => {
      const { getExerciseStats } = useProgressStore.getState()

      const stats = getExerciseStats('dual-nback')

      expect(stats).toBeDefined()
      expect(stats.currentDifficulty).toBe(2)
    })
  })

  describe('getRecentSessions', () => {
    it('should return most recent sessions in reverse order', () => {
      const { addSession, getRecentSessions } = useProgressStore.getState()

      const session1 = createMockSession({ score: 100 })
      const session2 = createMockSession({ score: 200 })
      const session3 = createMockSession({ score: 300 })

      addSession(session1)
      addSession(session2)
      addSession(session3)

      const recent = getRecentSessions(2)

      expect(recent).toHaveLength(2)
      expect(recent[0].score).toBe(300)
      expect(recent[1].score).toBe(200)
    })

    it('should return all sessions if count exceeds total', () => {
      const { addSession, getRecentSessions } = useProgressStore.getState()

      addSession(createMockSession())
      addSession(createMockSession())

      const recent = getRecentSessions(10)
      expect(recent).toHaveLength(2)
    })
  })

  describe('getSessionsByExercise', () => {
    it('should filter sessions by exercise type', () => {
      const { addSession, getSessionsByExercise } = useProgressStore.getState()

      addSession(createMockSession({ exerciseType: 'dual-nback' }))
      addSession(createMockSession({ exerciseType: 'sequence-memory' }))
      addSession(createMockSession({ exerciseType: 'dual-nback' }))

      const dualNBackSessions = getSessionsByExercise('dual-nback')
      expect(dualNBackSessions).toHaveLength(2)
    })
  })

  describe('calculateImprovementRate', () => {
    it('should return 0 if less than 5 sessions', () => {
      const { addSession, calculateImprovementRate } = useProgressStore.getState()

      addSession(createMockSession())
      addSession(createMockSession())

      const rate = calculateImprovementRate()
      expect(rate).toBe(0)
    })

    it('should calculate improvement rate correctly', () => {
      const { addSession, calculateImprovementRate } = useProgressStore.getState()

      // Add 10 sessions with improvement
      for (let i = 0; i < 5; i++) {
        addSession(createMockSession({ score: 100 }))
      }
      for (let i = 0; i < 5; i++) {
        addSession(createMockSession({ score: 150 }))
      }

      const rate = calculateImprovementRate()
      expect(rate).toBe(50) // 50% improvement
    })

    it('should calculate improvement for specific exercise', () => {
      const { addSession, calculateImprovementRate } = useProgressStore.getState()

      // Add sessions for dual-nback
      for (let i = 0; i < 5; i++) {
        addSession(createMockSession({ exerciseType: 'dual-nback', score: 100 }))
      }
      for (let i = 0; i < 5; i++) {
        addSession(createMockSession({ exerciseType: 'dual-nback', score: 200 }))
      }

      // Add sessions for other exercise
      addSession(createMockSession({ exerciseType: 'sequence-memory', score: 50 }))

      const rate = calculateImprovementRate('dual-nback')
      expect(rate).toBe(100) // 100% improvement for dual-nback
    })

    it('should return 0 if previous average is 0', () => {
      const { addSession, calculateImprovementRate } = useProgressStore.getState()

      for (let i = 0; i < 10; i++) {
        addSession(createMockSession({ score: 0 }))
      }

      const rate = calculateImprovementRate()
      expect(rate).toBe(0)
    })
  })

  describe('resetProgress', () => {
    it('should reset all progress data', () => {
      const { addSession, resetProgress } = useProgressStore.getState()

      addSession(createMockSession())
      addSession(createMockSession())

      resetProgress()

      const state = useProgressStore.getState()
      expect(state.sessions).toHaveLength(0)
      expect(state.stats.totalSessions).toBe(0)
      expect(state.timeline.daily).toEqual({})
    })
  })
})
