import { useUserStore } from '@/store/useUserStore';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { profile, level, streak } = useUserStore();

  if (!profile) return null;

  const xpPercentage = (level.currentXP / level.xpToNextLevel) * 100;

  return (
    <header className="bg-surface border-b border-gray-800 px-4 md:px-6 py-3 md:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-background rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <h1 className="text-lg md:text-2xl font-bold text-primary">MemoryApp</h1>
          <Badge variant="outline" className="text-xs md:text-sm">
            Beta
          </Badge>
        </div>

        <div className="flex items-center gap-2 md:gap-6">
          {/* Streak Counter - Hidden on very small screens */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xl md:text-2xl animate-streak-flame">🔥</span>
            <div>
              <p className="text-xs md:text-sm font-semibold">{streak.current} Day Streak</p>
              <p className="text-xs text-text-secondary hidden md:block">Best: {streak.longest}</p>
            </div>
          </div>

          {/* Mobile: Just show streak emoji */}
          <div className="sm:hidden flex items-center gap-1">
            <span className="text-lg animate-streak-flame">🔥</span>
            <span className="text-xs font-semibold">{streak.current}</span>
          </div>

          {/* Level & XP - Hidden on mobile */}
          <div className="hidden lg:block min-w-[200px]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-semibold">Level {level.currentLevel}</span>
              <span className="text-xs text-text-secondary">
                {level.currentXP}/{level.xpToNextLevel} XP
              </span>
            </div>
            <Progress value={xpPercentage} className="h-2" />
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold">{profile.name}</p>
              <p className="text-xs text-text-secondary capitalize">{profile.goal}</p>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center text-sm md:text-lg font-bold">
              {profile.name[0].toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
