import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useProgressStore } from '@/store/useProgressStore';
import { useUserStore } from '@/store/useUserStore';
import { ArrowLeft, Play, Home } from 'lucide-react';

const GRID_SIZE = 5; // 5x5 grid
const DISPLAY_TIME = 800; // ms per cell
const TOTAL_ROUNDS = 5;

export default function SpatialMemoryGame() {
  const navigate = useNavigate();
  const addSession = useProgressStore((state) => state.addSession);
  const addXP = useUserStore((state) => state.addXP);
  const updateStreak = useUserStore((state) => state.updateStreak);
  const exerciseStats = useProgressStore((state) => state.stats.exerciseProgress['spatial-memory']);

  const [phase, setPhase] = useState<'ready' | 'showing' | 'recall' | 'results'>('ready');
  const [round, setRound] = useState(0);
  const [sequenceLength] = useState(exerciseStats.currentDifficulty || 4);

  const [sequence, setSequence] = useState<number[]>([]);
  const [showingIndex, setShowingIndex] = useState(-1);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [correctRounds, setCorrectRounds] = useState(0);

  const generateSequence = useCallback(() => {
    const cells: number[] = [];
    const available = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i);

    for (let i = 0; i < sequenceLength; i++) {
      const randomIndex = Math.floor(Math.random() * available.length);
      cells.push(available[randomIndex]);
      available.splice(randomIndex, 1);
    }

    return cells;
  }, [sequenceLength]);

  const startGame = () => {
    const newSequence = generateSequence();
    setSequence(newSequence);
    setUserSequence([]);
    setShowingIndex(0);
    setPhase('showing');
    setRound(0);
    setCorrectRounds(0);
  };

  const startNewRound = () => {
    const newSequence = generateSequence();
    setSequence(newSequence);
    setUserSequence([]);
    setShowingIndex(0);
    setPhase('showing');
  };

  // Animation effect for showing sequence
  useEffect(() => {
    if (phase !== 'showing') return;

    if (showingIndex < sequence.length) {
      const timer = setTimeout(() => {
        setShowingIndex(showingIndex + 1);
      }, DISPLAY_TIME);
      return () => clearTimeout(timer);
    } else {
      // Finished showing
      const timer = setTimeout(() => {
        setShowingIndex(-1);
        setPhase('recall');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase, showingIndex, sequence.length]);

  const handleCellClick = (index: number) => {
    if (phase !== 'recall') return;

    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);

    // Check if complete
    if (newUserSequence.length === sequence.length) {
      const isCorrect = newUserSequence.every((val, idx) => val === sequence[idx]);

      if (isCorrect) {
        setCorrectRounds(correctRounds + 1);
      }

      const newRound = round + 1;
      setRound(newRound);

      if (newRound >= TOTAL_ROUNDS) {
        const accuracy = (correctRounds + (isCorrect ? 1 : 0)) / TOTAL_ROUNDS * 100;
        const score = accuracy * sequenceLength;

        addSession({
          id: `spatial-${Date.now()}`,
          exerciseType: 'spatial-memory',
          score,
          accuracy,
          duration: TOTAL_ROUNDS * sequenceLength * 2,
          difficulty: sequenceLength,
          trialsCompleted: TOTAL_ROUNDS,
          reactionTime: 0,
          timestamp: new Date(),
        });

        addXP(Math.round(score));
        updateStreak();
        setPhase('results');
      } else {
        setTimeout(startNewRound, 1000);
      }
    }
  };

  const accuracy = round > 0 ? (correctRounds / round) * 100 : 0;

  if (phase === 'ready') {
    return (
      <div className="max-w-4xl mx-auto">
        <Button onClick={() => navigate('/exercises')} variant="outline" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Exercises
        </Button>

        <Card className="p-6 md:p-8 bg-surface">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Spatial Memory Grid</h1>
          <p className="text-text-secondary mb-6">
            Watch cells light up in sequence, then tap them back in the same order. Based on the Corsi Block Test.
          </p>

          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-semibold mb-2">How to Play:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-text-secondary">
                <li>Watch as cells in the grid light up one by one</li>
                <li>Memorize the sequence and order</li>
                <li>Tap the cells in the exact same order</li>
                <li>Complete {TOTAL_ROUNDS} rounds successfully</li>
              </ol>
            </div>

            <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
              <p className="text-sm">
                <span className="font-semibold">Current Level:</span> {sequenceLength} cells
              </p>
            </div>
          </div>

          <Button onClick={startGame} size="lg" className="w-full">
            <Play className="w-5 h-5 mr-2" />
            Start Game
          </Button>
        </Card>
      </div>
    );
  }

  if (phase === 'results') {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 md:p-8 bg-surface">
          <div className="text-center">
            <div className="text-6xl mb-4">
              {accuracy >= 80 ? '🎉' : accuracy >= 60 ? '👍' : '💪'}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Training Complete!</h1>
            <p className="text-text-secondary mb-8">You got {correctRounds} out of {TOTAL_ROUNDS} sequences correct</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <Card className="p-6 bg-background">
              <p className="text-sm text-text-secondary mb-1">Accuracy</p>
              <p className="text-3xl font-bold text-success">{Math.round(accuracy)}%</p>
            </Card>

            <Card className="p-6 bg-background">
              <p className="text-sm text-text-secondary mb-1">Correct</p>
              <p className="text-3xl font-bold text-primary">{correctRounds}/{TOTAL_ROUNDS}</p>
            </Card>
          </div>

          <div className="space-y-3">
            <Button onClick={() => { setPhase('ready'); }} size="lg" className="w-full">
              <Play className="w-5 h-5 mr-2" />
              Play Again
            </Button>
            <Button onClick={() => navigate('/')} variant="outline" size="lg" className="w-full">
              <Home className="w-5 h-5 mr-2" />
              Return to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold">Round {round + 1} of {TOTAL_ROUNDS}</span>
          <span className="text-sm text-text-secondary">Correct: {correctRounds}</span>
        </div>
        <Progress value={(round / TOTAL_ROUNDS) * 100} className="h-2" />
      </div>

      <Card className="p-6 md:p-8 bg-surface">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            {phase === 'showing' ? 'Watch the Sequence' : 'Tap in Order'}
          </h2>
          <p className="text-sm text-text-secondary">
            {phase === 'showing'
              ? 'Memorize the order...'
              : `${userSequence.length}/${sequence.length} tapped`}
          </p>
        </div>

        {/* Spatial Grid */}
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-5 gap-2 md:gap-3">
            {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
              const isShowing = phase === 'showing' && sequence[showingIndex] === index;
              const isInUserSequence = userSequence.includes(index);
              const userIndex = userSequence.indexOf(index);

              return (
                <button
                  key={index}
                  onClick={() => handleCellClick(index)}
                  disabled={phase !== 'recall'}
                  className={`
                    aspect-square rounded-lg transition-all duration-200
                    ${isShowing ? 'bg-primary scale-110 shadow-lg shadow-primary/50' : ''}
                    ${!isShowing && phase === 'showing' ? 'bg-surface border-2 border-border' : ''}
                    ${phase === 'recall' && !isInUserSequence ? 'bg-surface border-2 border-border hover:bg-surface/80 cursor-pointer' : ''}
                    ${isInUserSequence ? 'bg-primary/50' : ''}
                  `}
                  aria-label={`Cell ${index + 1}`}
                >
                  {isInUserSequence && (
                    <span className="text-xs font-bold">{userIndex + 1}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {phase === 'recall' && (
          <div className="mt-6 text-center">
            <p className="text-xs text-text-secondary">
              Tap the cells in the order they lit up
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
