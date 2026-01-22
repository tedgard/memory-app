import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ExercisesPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Training Exercises</h1>

      <Card className="p-4 md:p-8 bg-surface mb-6">
        <Link to="/exercises/dual-nback">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start md:items-center gap-4 md:gap-6">
              <div className="text-4xl md:text-6xl">🧩</div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-2">Dual N-Back</h2>
                <p className="text-sm md:text-base text-text-secondary mb-2">
                  Simultaneous visual and audio memory training - the most scientifically validated exercise
                </p>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">Most Effective</span>
                  <span className="text-xs px-2 py-1 bg-success/20 text-success rounded">Recommended</span>
                </div>
              </div>
            </div>
            <Button size="lg" className="w-full md:w-auto">Start Training</Button>
          </div>
        </Link>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 bg-surface hover:bg-surface/80 transition-colors">
          <Link to="/exercises/sequence-memory" className="block">
            <div className="text-4xl mb-3">🔢</div>
            <h3 className="text-xl font-bold mb-2">Sequence Memory</h3>
            <p className="text-sm text-text-secondary mb-3">
              Remember and reproduce progressively longer color sequences
            </p>
            <span className="text-xs px-2 py-1 bg-secondary/20 text-secondary rounded">Available</span>
          </Link>
        </Card>

        <Card className="p-6 bg-surface hover:bg-surface/80 transition-colors">
          <Link to="/exercises/pattern-recognition" className="block">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="text-xl font-bold mb-2">Pattern Recognition</h3>
            <p className="text-sm text-text-secondary mb-3">
              Study and recreate visual patterns from memory
            </p>
            <span className="text-xs px-2 py-1 bg-secondary/20 text-secondary rounded">Available</span>
          </Link>
        </Card>

        <Card className="p-6 bg-surface hover:bg-surface/80 transition-colors">
          <Link to="/exercises/operation-span" className="block">
            <div className="text-4xl mb-3">➕</div>
            <h3 className="text-xl font-bold mb-2">Operation Span</h3>
            <p className="text-sm text-text-secondary mb-3">
              Solve math problems while remembering letters - dual task training
            </p>
            <span className="text-xs px-2 py-1 bg-secondary/20 text-secondary rounded">Available</span>
          </Link>
        </Card>

        <Card className="p-6 bg-surface hover:bg-surface/80 transition-colors">
          <Link to="/exercises/spatial-memory" className="block">
            <div className="text-4xl mb-3">📍</div>
            <h3 className="text-xl font-bold mb-2">Spatial Memory Grid</h3>
            <p className="text-sm text-text-secondary mb-3">
              Watch and recall spatial sequences - Corsi block test
            </p>
            <span className="text-xs px-2 py-1 bg-secondary/20 text-secondary rounded">Available</span>
          </Link>
        </Card>
      </div>
    </div>
  );
}
