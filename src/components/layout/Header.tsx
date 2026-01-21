import { useUserStore } from '@/store/useUserStore';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function Header() {
  const { profile, level, streak } = useUserStore();

  if (!profile) return null;

  const xpPercentage = (level.currentXP / level.xpToNextLevel) * 100;

  return (
    <header className="bg-surface border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-primary">MemoryApp</h1>
          <Badge variant="outline" className="text-sm">
            Beta
          </Badge>
        </div>

        <div className="flex items-center gap-6">
          {/* Streak Counter */}
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-streak-flame">🔥</span>
            <div>
              <p className="text-sm font-semibold">{streak.current} Day Streak</p>
              <p className="text-xs text-text-secondary">Best: {streak.longest}</p>
            </div>
          </div>

          {/* Level & XP */}
          <div className="min-w-[200px]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-semibold">Level {level.currentLevel}</span>
              <span className="text-xs text-text-secondary">
                {level.currentXP}/{level.xpToNextLevel} XP
              </span>
            </div>
            <Progress value={xpPercentage} className="h-2" />
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold">{profile.name}</p>
              <p className="text-xs text-text-secondary capitalize">{profile.goal}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-lg font-bold">
              {profile.name[0].toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
