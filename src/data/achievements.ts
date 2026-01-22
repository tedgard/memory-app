export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'consistency' | 'mastery' | 'dedication' | 'improvement' | 'perfectionist';
  requirement: number;
  checkProgress: (stats: any) => number;
}

export const achievements: Achievement[] = [
  // Consistency
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day training streak',
    icon: '🔥',
    category: 'consistency',
    requirement: 7,
    checkProgress: (stats) => stats.streak?.longest || 0,
  },
  {
    id: 'streak-14',
    title: 'Two Week Champion',
    description: 'Maintain a 14-day training streak',
    icon: '🔥🔥',
    category: 'consistency',
    requirement: 14,
    checkProgress: (stats) => stats.streak?.longest || 0,
  },
  {
    id: 'streak-30',
    title: 'Month Master',
    description: 'Maintain a 30-day training streak',
    icon: '💯',
    category: 'consistency',
    requirement: 30,
    checkProgress: (stats) => stats.streak?.longest || 0,
  },

  // Dedication
  {
    id: 'sessions-10',
    title: 'Getting Started',
    description: 'Complete 10 training sessions',
    icon: '🎯',
    category: 'dedication',
    requirement: 10,
    checkProgress: (stats) => stats.totalSessions || 0,
  },
  {
    id: 'sessions-50',
    title: 'Committed Trainer',
    description: 'Complete 50 training sessions',
    icon: '💪',
    category: 'dedication',
    requirement: 50,
    checkProgress: (stats) => stats.totalSessions || 0,
  },
  {
    id: 'sessions-100',
    title: 'Centurion',
    description: 'Complete 100 training sessions',
    icon: '🏆',
    category: 'dedication',
    requirement: 100,
    checkProgress: (stats) => stats.totalSessions || 0,
  },

  // Mastery
  {
    id: 'nback-4',
    title: 'N-Back Novice',
    description: 'Reach 4-back level in Dual N-Back',
    icon: '🧠',
    category: 'mastery',
    requirement: 4,
    checkProgress: (stats) => stats.exerciseProgress?.['dual-nback']?.currentDifficulty || 0,
  },
  {
    id: 'nback-6',
    title: 'N-Back Expert',
    description: 'Reach 6-back level in Dual N-Back',
    icon: '🧠✨',
    category: 'mastery',
    requirement: 6,
    checkProgress: (stats) => stats.exerciseProgress?.['dual-nback']?.currentDifficulty || 0,
  },
  {
    id: 'nback-8',
    title: 'N-Back Master',
    description: 'Reach 8-back level in Dual N-Back',
    icon: '🧠👑',
    category: 'mastery',
    requirement: 8,
    checkProgress: (stats) => stats.exerciseProgress?.['dual-nback']?.currentDifficulty || 0,
  },

  // Perfectionist
  {
    id: 'perfect-5',
    title: 'Perfectionist',
    description: 'Complete 5 sessions with 100% accuracy',
    icon: '⭐',
    category: 'perfectionist',
    requirement: 5,
    checkProgress: (stats) => stats.perfectSessions || 0,
  },
  {
    id: 'perfect-10',
    title: 'Flawless',
    description: 'Complete 10 sessions with 100% accuracy',
    icon: '⭐⭐',
    category: 'perfectionist',
    requirement: 10,
    checkProgress: (stats) => stats.perfectSessions || 0,
  },

  // Improvement
  {
    id: 'accuracy-80',
    title: 'Sharp Mind',
    description: 'Achieve 80% average accuracy',
    icon: '🎓',
    category: 'improvement',
    requirement: 80,
    checkProgress: (stats) => stats.averageAccuracy || 0,
  },
  {
    id: 'accuracy-90',
    title: 'Mental Athlete',
    description: 'Achieve 90% average accuracy',
    icon: '🎓✨',
    category: 'improvement',
    requirement: 90,
    checkProgress: (stats) => stats.averageAccuracy || 0,
  },
];
