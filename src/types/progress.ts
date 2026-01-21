import type { ExerciseType, ExerciseStats, SessionMetrics } from './exercise';

export interface ProgressStats {
  totalSessions: number;
  totalTime: number; // minutes
  averageAccuracy: number;
  improvementRate: number; // percentage
  currentStreak: number;
  exerciseProgress: Record<ExerciseType, ExerciseStats>;
  weeklyGoal: number; // sessions per week
  weeklyCompleted: number;
  monthlyGoal: number;
  monthlyCompleted: number;
}

export interface DailyProgress {
  date: string; // YYYY-MM-DD
  sessions: SessionMetrics[];
  totalTime: number; // minutes
  xpEarned: number;
  achieved: boolean;
}

export interface WeeklyProgress {
  weekStart: string; // YYYY-MM-DD
  sessions: number;
  totalTime: number;
  averageScore: number;
  streak: number;
}

export interface ProgressTimeline {
  daily: Record<string, DailyProgress>;
  weekly: Record<string, WeeklyProgress>;
}
