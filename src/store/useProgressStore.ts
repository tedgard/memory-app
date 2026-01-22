import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SessionMetrics, ExerciseType, ExerciseStats } from '@/types/exercise';
import type { ProgressStats, ProgressTimeline, DailyProgress } from '@/types/progress';

interface ProgressState {
  sessions: SessionMetrics[];
  stats: ProgressStats;
  timeline: ProgressTimeline;

  // Actions
  addSession: (session: SessionMetrics) => void;
  getExerciseStats: (exerciseType: ExerciseType) => ExerciseStats;
  getRecentSessions: (count: number) => SessionMetrics[];
  getSessionsByExercise: (exerciseType: ExerciseType) => SessionMetrics[];
  calculateImprovementRate: (exerciseType?: ExerciseType) => number;
  resetProgress: () => void;
}

const initialStats: ProgressStats = {
  totalSessions: 0,
  totalTime: 0,
  averageAccuracy: 0,
  improvementRate: 0,
  currentStreak: 0,
  perfectSessions: 0,
  exerciseProgress: {
    'dual-nback': {
      totalSessions: 0,
      totalTime: 0,
      averageAccuracy: 0,
      averageScore: 0,
      bestScore: 0,
      currentDifficulty: 2,
      lastPlayed: null,
    },
    'sequence-memory': {
      totalSessions: 0,
      totalTime: 0,
      averageAccuracy: 0,
      averageScore: 0,
      bestScore: 0,
      currentDifficulty: 3,
      lastPlayed: null,
    },
    'pattern-recognition': {
      totalSessions: 0,
      totalTime: 0,
      averageAccuracy: 0,
      averageScore: 0,
      bestScore: 0,
      currentDifficulty: 1,
      lastPlayed: null,
    },
    'operation-span': {
      totalSessions: 0,
      totalTime: 0,
      averageAccuracy: 0,
      averageScore: 0,
      bestScore: 0,
      currentDifficulty: 1,
      lastPlayed: null,
    },
    'spatial-memory': {
      totalSessions: 0,
      totalTime: 0,
      averageAccuracy: 0,
      averageScore: 0,
      bestScore: 0,
      currentDifficulty: 4,
      lastPlayed: null,
    },
  },
  weeklyGoal: 5,
  weeklyCompleted: 0,
  monthlyGoal: 20,
  monthlyCompleted: 0,
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      sessions: [],
      stats: initialStats,
      timeline: { daily: {}, weekly: {} },

      addSession: (session) => {
        const { sessions, stats } = get();
        const newSessions = [...sessions, session];

        // Update exercise-specific stats
        const exerciseStats = { ...stats.exerciseProgress[session.exerciseType] };
        exerciseStats.totalSessions += 1;
        exerciseStats.totalTime += session.duration / 60; // Convert to minutes
        exerciseStats.lastPlayed = session.timestamp;
        exerciseStats.bestScore = Math.max(exerciseStats.bestScore, session.score);

        // Calculate new average accuracy
        const prevTotal = exerciseStats.averageAccuracy * (exerciseStats.totalSessions - 1);
        exerciseStats.averageAccuracy = (prevTotal + session.accuracy) / exerciseStats.totalSessions;

        // Calculate new average score
        const prevScoreTotal = exerciseStats.averageScore * (exerciseStats.totalSessions - 1);
        exerciseStats.averageScore = (prevScoreTotal + session.score) / exerciseStats.totalSessions;

        // Update current difficulty if needed (adaptive)
        // Set minimum difficulty based on exercise type
        const minDifficulty = session.exerciseType === 'sequence-memory' ? 3 :
                             session.exerciseType === 'dual-nback' ? 2 : 1;
        const maxDifficulty = 10;

        if (session.accuracy >= 85 && exerciseStats.currentDifficulty < maxDifficulty) {
          exerciseStats.currentDifficulty += 1;
        } else if (session.accuracy < 60 && exerciseStats.currentDifficulty > minDifficulty) {
          exerciseStats.currentDifficulty -= 1;
        }

        // Update global stats
        const newStats: ProgressStats = {
          ...stats,
          totalSessions: stats.totalSessions + 1,
          totalTime: stats.totalTime + session.duration / 60,
          averageAccuracy:
            (stats.averageAccuracy * stats.totalSessions + session.accuracy) / (stats.totalSessions + 1),
          perfectSessions: stats.perfectSessions + (session.accuracy === 100 ? 1 : 0),
          exerciseProgress: {
            ...stats.exerciseProgress,
            [session.exerciseType]: exerciseStats,
          },
        };

        // Update daily timeline
        const dateKey = new Date(session.timestamp).toISOString().split('T')[0];
        const { timeline } = get();
        const dailyProgress: DailyProgress = timeline.daily[dateKey] || {
          date: dateKey,
          sessions: [],
          totalTime: 0,
          xpEarned: 0,
          achieved: false,
        };

        dailyProgress.sessions.push(session);
        dailyProgress.totalTime += session.duration / 60;

        set({
          sessions: newSessions,
          stats: newStats,
          timeline: {
            ...timeline,
            daily: {
              ...timeline.daily,
              [dateKey]: dailyProgress,
            },
          },
        });
      },

      getExerciseStats: (exerciseType) => {
        const { stats } = get();
        return stats.exerciseProgress[exerciseType];
      },

      getRecentSessions: (count) => {
        const { sessions } = get();
        return sessions.slice(-count).reverse();
      },

      getSessionsByExercise: (exerciseType) => {
        const { sessions } = get();
        return sessions.filter((s) => s.exerciseType === exerciseType);
      },

      calculateImprovementRate: (exerciseType) => {
        const { sessions } = get();
        let relevantSessions = exerciseType
          ? sessions.filter((s) => s.exerciseType === exerciseType)
          : sessions;

        if (relevantSessions.length < 5) return 0;

        // Compare last 5 sessions with previous 5 sessions
        const recent = relevantSessions.slice(-5);
        const previous = relevantSessions.slice(-10, -5);

        if (previous.length === 0) return 0;

        const recentAvg = recent.reduce((sum, s) => sum + s.score, 0) / recent.length;
        const previousAvg = previous.reduce((sum, s) => sum + s.score, 0) / previous.length;

        if (previousAvg === 0) return 0;

        return ((recentAvg - previousAvg) / previousAvg) * 100;
      },

      resetProgress: () => {
        set({
          sessions: [],
          stats: initialStats,
          timeline: { daily: {}, weekly: {} },
        });
      },
    }),
    {
      name: 'memory-app-progress',
    }
  )
);
