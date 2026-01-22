import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/store/useProgressStore';
import { useUserStore } from '@/store/useUserStore';

export default function Dashboard() {
  const stats = useProgressStore((state) => state.stats);
  const streak = useUserStore((state) => state.streak);

  return (
    <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-sm md:text-base text-text-secondary">
          Ready to boost your working memory? Let's get started with today's training.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-surface">
          <p className="text-sm text-text-secondary mb-1">Total Sessions</p>
          <p className="text-3xl font-bold text-primary">{stats.totalSessions}</p>
        </Card>

        <Card className="p-6 bg-surface">
          <p className="text-sm text-text-secondary mb-1">Training Time</p>
          <p className="text-3xl font-bold text-success">{Math.round(stats.totalTime)} min</p>
        </Card>

        <Card className="p-6 bg-surface">
          <p className="text-sm text-text-secondary mb-1">Avg Accuracy</p>
          <p className="text-3xl font-bold text-secondary">{Math.round(stats.averageAccuracy)}%</p>
        </Card>

        <Card className="p-6 bg-surface">
          <p className="text-sm text-text-secondary mb-1">Current Streak</p>
          <p className="text-3xl font-bold text-warning">{streak.current} days</p>
        </Card>
      </div>

      {/* Daily Challenge */}
      <Card className="p-4 md:p-8 bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold mb-2">Today's Challenge</h2>
            <p className="text-sm md:text-base text-text-secondary mb-4">
              Complete a Dual N-Back session to maintain your streak
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                <Link to="/exercises/dual-nback">Start Training</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link to="/exercises">Browse All Exercises</Link>
              </Button>
            </div>
          </div>
          <div className="text-4xl md:text-8xl">🎯</div>
        </div>
      </Card>

      {/* Exercise Cards */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Training Exercises</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-6 bg-surface hover:bg-surface/80 transition-colors cursor-pointer">
            <Link to="/exercises/dual-nback" className="block">
              <div className="text-4xl mb-3">🧩</div>
              <h3 className="text-xl font-bold mb-2">Dual N-Back</h3>
              <p className="text-sm text-text-secondary mb-3">
                The gold standard for working memory training
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-primary">Most Effective</span>
                <span className="text-xs text-text-secondary">
                  Level {stats.exerciseProgress['dual-nback'].currentDifficulty}
                </span>
              </div>
            </Link>
          </Card>

          <Card className="p-6 bg-surface hover:bg-surface/80 transition-colors cursor-pointer">
            <Link to="/exercises/sequence-memory" className="block">
              <div className="text-4xl mb-3">🔢</div>
              <h3 className="text-xl font-bold mb-2">Sequence Memory</h3>
              <p className="text-sm text-text-secondary mb-3">
                Remember and reproduce progressively longer sequences
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-secondary">Available</span>
                <span className="text-xs text-text-secondary">
                  Level {stats.exerciseProgress['sequence-memory'].currentDifficulty}
                </span>
              </div>
            </Link>
          </Card>

          <Card className="p-6 bg-surface hover:bg-surface/80 transition-colors cursor-pointer">
            <Link to="/exercises/pattern-recognition" className="block">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="text-xl font-bold mb-2">Pattern Recognition</h3>
              <p className="text-sm text-text-secondary mb-3">
                Study and recreate visual patterns from memory
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-secondary">Available</span>
                <span className="text-xs text-text-secondary">
                  Level {stats.exerciseProgress['pattern-recognition'].currentDifficulty}
                </span>
              </div>
            </Link>
          </Card>

          <Card className="p-6 bg-surface hover:bg-surface/80 transition-colors cursor-pointer">
            <Link to="/exercises/operation-span" className="block">
              <div className="text-4xl mb-3">➕</div>
              <h3 className="text-xl font-bold mb-2">Operation Span</h3>
              <p className="text-sm text-text-secondary mb-3">
                Solve math problems while remembering letters
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-secondary">Available</span>
                <span className="text-xs text-text-secondary">
                  Level {stats.exerciseProgress['operation-span'].currentDifficulty}
                </span>
              </div>
            </Link>
          </Card>

          <Card className="p-6 bg-surface hover:bg-surface/80 transition-colors cursor-pointer">
            <Link to="/exercises/spatial-memory" className="block">
              <div className="text-4xl mb-3">📍</div>
              <h3 className="text-xl font-bold mb-2">Spatial Memory Grid</h3>
              <p className="text-sm text-text-secondary mb-3">
                Watch and recall spatial sequences - Corsi block test
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-secondary">Available</span>
                <span className="text-xs text-text-secondary">
                  Level {stats.exerciseProgress['spatial-memory'].currentDifficulty}
                </span>
              </div>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
