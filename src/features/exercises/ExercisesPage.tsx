import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ExercisesPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Training Exercises</h1>

      <Card className="p-8 bg-surface mb-6">
        <Link to="/exercises/dual-nback">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-6xl">🧩</div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Dual N-Back</h2>
                <p className="text-text-secondary mb-2">
                  Simultaneous visual and audio memory training - the most scientifically validated exercise
                </p>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">Most Effective</span>
                  <span className="text-xs px-2 py-1 bg-success/20 text-success rounded">Recommended</span>
                </div>
              </div>
            </div>
            <Button size="lg">Start Training</Button>
          </div>
        </Link>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 bg-surface/50 opacity-60">
          <div className="text-4xl mb-3">🔢</div>
          <h3 className="text-xl font-bold mb-2">Sequence Memory</h3>
          <p className="text-sm text-text-secondary mb-3">Coming Soon</p>
        </Card>

        <Card className="p-6 bg-surface/50 opacity-60">
          <div className="text-4xl mb-3">🎨</div>
          <h3 className="text-xl font-bold mb-2">Pattern Recognition</h3>
          <p className="text-sm text-text-secondary mb-3">Coming Soon</p>
        </Card>

        <Card className="p-6 bg-surface/50 opacity-60">
          <div className="text-4xl mb-3">➕</div>
          <h3 className="text-xl font-bold mb-2">Operation Span</h3>
          <p className="text-sm text-text-secondary mb-3">Coming Soon</p>
        </Card>

        <Card className="p-6 bg-surface/50 opacity-60">
          <div className="text-4xl mb-3">📍</div>
          <h3 className="text-xl font-bold mb-2">Spatial Memory</h3>
          <p className="text-sm text-text-secondary mb-3">Coming Soon</p>
        </Card>
      </div>
    </div>
  );
}
