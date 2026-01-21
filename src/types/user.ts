export interface UserProfile {
  id: string;
  name: string;
  createdAt: Date;
  onboardingCompleted: boolean;
  goal: UserGoal;
  experienceLevel: ExperienceLevel;
  preferences: UserPreferences;
}

export type UserGoal = 'focus' | 'learning' | 'memory' | 'intelligence';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserPreferences {
  soundEnabled: boolean;
  volume: number; // 0-1
  notificationsEnabled: boolean;
  reminderTime: string | null; // HH:MM format
  theme: 'light' | 'dark' | 'auto';
  language: string;
}

export interface UserLevel {
  currentLevel: number;
  currentXP: number;
  xpToNextLevel: number;
  totalXP: number;
}

export interface StreakData {
  current: number;
  longest: number;
  lastActivityDate: Date | null;
  streakMilestones: number[];
  freezeCards: number;
}
