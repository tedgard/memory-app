import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useProgressStore } from '@/store/useProgressStore';
import { useUserStore } from '@/store/useUserStore';
import { achievements } from '@/data/achievements';

export default function AchievementsPage() {
  const stats = useProgressStore((state) => state.stats);
  const streak = useUserStore((state) => state.streak);

  const statsWithStreak = { ...stats, streak };

  const categories = {
    consistency: { name: 'Consistency', color: 'text-warning' },
    mastery: { name: 'Mastery', color: 'text-primary' },
    dedication: { name: 'Dedication', color: 'text-success' },
    improvement: { name: 'Improvement', color: 'text-secondary' },
    perfectionist: { name: 'Perfectionist', color: 'text-error' },
  };

  const getAchievementStatus = (achievement: typeof achievements[0]) => {
    const progress = achievement.checkProgress(statsWithStreak);
    const isUnlocked = progress >= achievement.requirement;
    const percentage = Math.min((progress / achievement.requirement) * 100, 100);

    return { progress, isUnlocked, percentage };
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Achievements</h1>
        <p className="text-sm md:text-base text-text-secondary">
          Track your progress and unlock achievements as you improve your cognitive abilities
        </p>
      </div>

      {Object.entries(categories).map(([categoryKey, categoryInfo]) => {
        const categoryAchievements = achievements.filter((a) => a.category === categoryKey);

        return (
          <div key={categoryKey} className="mb-8">
            <h2 className={`text-xl font-bold mb-4 ${categoryInfo.color}`}>
              {categoryInfo.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryAchievements.map((achievement) => {
                const { progress, isUnlocked, percentage } = getAchievementStatus(achievement);

                return (
                  <Card
                    key={achievement.id}
                    className={`p-4 md:p-6 transition-all ${
                      isUnlocked
                        ? 'bg-surface border-primary/50'
                        : 'bg-surface/50 opacity-70'
                    }`}
                  >
                    <div className="flex items-start gap-3 md:gap-4 mb-3">
                      <div
                        className={`text-3xl md:text-4xl ${
                          isUnlocked ? '' : 'grayscale opacity-50'
                        }`}
                      >
                        {achievement.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-bold mb-1 truncate">
                          {achievement.title}
                        </h3>
                        <p className="text-xs md:text-sm text-text-secondary">
                          {achievement.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-text-secondary">
                          {isUnlocked ? 'Unlocked!' : 'Progress'}
                        </span>
                        <span className={isUnlocked ? 'text-success font-semibold' : ''}>
                          {progress} / {achievement.requirement}
                        </span>
                      </div>
                      <Progress value={percentage} className="h-1.5" />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Summary Stats */}
      <Card className="p-4 md:p-6 bg-surface mt-8">
        <h3 className="text-lg md:text-xl font-bold mb-4">Your Progress</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs md:text-sm text-text-secondary mb-1">Total Unlocked</p>
            <p className="text-xl md:text-2xl font-bold text-primary">
              {achievements.filter((a) => getAchievementStatus(a).isUnlocked).length}
            </p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-text-secondary mb-1">Total Sessions</p>
            <p className="text-xl md:text-2xl font-bold text-success">{stats.totalSessions}</p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-text-secondary mb-1">Current Streak</p>
            <p className="text-xl md:text-2xl font-bold text-warning">{streak.current}</p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-text-secondary mb-1">Avg Accuracy</p>
            <p className="text-xl md:text-2xl font-bold text-secondary">
              {Math.round(stats.averageAccuracy)}%
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
