import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, UserLevel, StreakData, UserGoal, ExperienceLevel } from '@/types/user';

interface UserState {
  profile: UserProfile | null;
  level: UserLevel;
  streak: StreakData;

  // Actions
  createProfile: (name: string, goal: UserGoal, experienceLevel: ExperienceLevel) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  completeOnboarding: () => void;
  addXP: (amount: number) => void;
  updateStreak: () => void;
  useFreezeCard: () => void;
  addFreezeCard: () => void;
  resetProfile: () => void;
}

const calculateXPForLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(level, 1.5));
};

const initialLevel: UserLevel = {
  currentLevel: 1,
  currentXP: 0,
  xpToNextLevel: calculateXPForLevel(1),
  totalXP: 0,
};

const initialStreak: StreakData = {
  current: 0,
  longest: 0,
  lastActivityDate: null,
  streakMilestones: [7, 14, 30, 60, 90, 180, 365],
  freezeCards: 0,
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: null,
      level: initialLevel,
      streak: initialStreak,

      createProfile: (name, goal, experienceLevel) => {
        const profile: UserProfile = {
          id: crypto.randomUUID(),
          name,
          createdAt: new Date(),
          onboardingCompleted: false,
          goal,
          experienceLevel,
          preferences: {
            soundEnabled: true,
            volume: 0.7,
            notificationsEnabled: false,
            reminderTime: null,
            theme: 'dark',
            language: 'en',
          },
        };
        set({ profile });
      },

      updateProfile: (updates) => {
        const { profile } = get();
        if (!profile) return;
        set({ profile: { ...profile, ...updates } });
      },

      completeOnboarding: () => {
        const { profile } = get();
        if (!profile) return;
        set({ profile: { ...profile, onboardingCompleted: true } });
      },

      addXP: (amount) => {
        const { level } = get();
        let newXP = level.currentXP + amount;
        let newLevel = level.currentLevel;
        let newTotalXP = level.totalXP + amount;
        let xpForNext = level.xpToNextLevel;

        // Check for level up
        while (newXP >= xpForNext) {
          newXP -= xpForNext;
          newLevel += 1;
          xpForNext = calculateXPForLevel(newLevel);
        }

        set({
          level: {
            currentLevel: newLevel,
            currentXP: newXP,
            xpToNextLevel: xpForNext,
            totalXP: newTotalXP,
          },
        });
      },

      updateStreak: () => {
        const { streak } = get();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (!streak.lastActivityDate) {
          // First activity ever
          set({
            streak: {
              ...streak,
              current: 1,
              longest: 1,
              lastActivityDate: today,
            },
          });
          return;
        }

        const lastDate = new Date(streak.lastActivityDate);
        lastDate.setHours(0, 0, 0, 0);
        const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
          // Same day, no change
          return;
        } else if (diffDays === 1) {
          // Consecutive day, increase streak
          const newCurrent = streak.current + 1;
          set({
            streak: {
              ...streak,
              current: newCurrent,
              longest: Math.max(streak.longest, newCurrent),
              lastActivityDate: today,
            },
          });
        } else {
          // Streak broken, reset to 1
          set({
            streak: {
              ...streak,
              current: 1,
              longest: streak.longest, // Keep longest unchanged
              lastActivityDate: today,
            },
          });
        }
      },

      useFreezeCard: () => {
        const { streak } = get();
        if (streak.freezeCards > 0) {
          set({
            streak: {
              ...streak,
              freezeCards: streak.freezeCards - 1,
            },
          });
        }
      },

      addFreezeCard: () => {
        const { streak } = get();
        set({
          streak: {
            ...streak,
            freezeCards: streak.freezeCards + 1,
          },
        });
      },

      resetProfile: () => {
        set({
          profile: null,
          level: initialLevel,
          streak: initialStreak,
        });
      },
    }),
    {
      name: 'memory-app-user',
    }
  )
);
