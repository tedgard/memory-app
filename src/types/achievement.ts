export type AchievementCategory =
  | 'consistency'
  | 'mastery'
  | 'dedication'
  | 'improvement'
  | 'perfectionist'
  | 'speed'
  | 'scholar';

export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  icon: string;
  rarity: AchievementRarity;
  xpReward: number;
  unlockedAt?: Date;
  progress: number;
  target: number;
  hidden: boolean; // Secret achievements
}

export interface AchievementProgress {
  achievementId: string;
  progress: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  icon: string;
  rarity: AchievementRarity;
  xpReward: number;
  target: number;
  hidden: boolean;
  condition: (data: AchievementCheckData) => boolean;
}

export interface AchievementCheckData {
  currentStreak: number;
  longestStreak: number;
  totalSessions: number;
  totalScore: number;
  nBackLevel: number;
  perfectSessions: number;
  averageReactionTime: number;
  articlesRead: number;
  improvementRate: number;
}
