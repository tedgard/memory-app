import { Card } from '@/components/ui/card';
import { useProgressStore } from '@/store/useProgressStore';

export default function ProgressPage() {
  const { stats, sessions } = useProgressStore();
  const recentSessions = sessions.slice(-5).reverse();

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Progress</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-6 bg-surface">
          <p className="text-sm text-text-secondary mb-1">Total Sessions</p>
          <p className="text-3xl font-bold">{stats.totalSessions}</p>
        </Card>

        <Card className="p-6 bg-surface">
          <p className="text-sm text-text-secondary mb-1">Total Training Time</p>
          <p className="text-3xl font-bold">{Math.round(stats.totalTime)} minutes</p>
        </Card>

        <Card className="p-6 bg-surface">
          <p className="text-sm text-text-secondary mb-1">Average Accuracy</p>
          <p className="text-3xl font-bold">{Math.round(stats.averageAccuracy)}%</p>
        </Card>
      </div>

      <Card className="p-6 bg-surface">
        <h2 className="text-xl font-bold mb-4">Recent Sessions</h2>
        {recentSessions.length === 0 ? (
          <p className="text-text-secondary">No sessions yet. Start training to see your progress!</p>
        ) : (
          <div className="space-y-3">
            {recentSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 bg-background rounded-lg"
              >
                <div>
                  <p className="font-semibold capitalize">{session.exerciseType.replace('-', ' ')}</p>
                  <p className="text-sm text-text-secondary">
                    {new Date(session.timestamp).toLocaleDateString()} at{' '}
                    {new Date(session.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{Math.round(session.score)}</p>
                  <p className="text-sm text-text-secondary">{Math.round(session.accuracy)}% accuracy</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
