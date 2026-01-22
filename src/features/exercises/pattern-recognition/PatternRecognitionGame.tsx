import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useProgressStore } from '@/store/useProgressStore';
import { useUserStore } from '@/store/useUserStore';
import { ArrowLeft, Play, Home } from 'lucide-react';

const GRID_SIZE = 4;
const DISPLAY_TIME = 2000;
const TOTAL_ROUNDS = 5;

export default function PatternRecognitionGame() {
  const navigate = useNavigate();
  const addSession = useProgressStore((state) => state.addSession);
  const addXP = useUserStore((state) => state.addXP);
  const updateStreak = useUserStore((state) => state.updateStreak);

  const [phase, setPhase] = useState<'ready' | 'showing' | 'input' | 'results'>('ready');
  const [round, setRound] = useState(0);
  const [pattern, setPattern] = useState<boolean[]>([]);
  const [userPattern, setUserPattern] = useState<boolean[]>([]);
  const [correctRounds, setCorrectRounds] = useState(0);
  const [difficulty] = useState(5); // Number of filled cells

  const generatePattern = useCallback(() => {
    const cells = Array(GRID_SIZE * GRID_SIZE).fill(false);
    const positions = new Set<number>();

    while (positions.size < difficulty) {
      positions.add(Math.floor(Math.random() * cells.length));
    }

    positions.forEach(pos => cells[pos] = true);
    return cells;
  }, [difficulty]);

  const startGame = () => {
    const newPattern = generatePattern();
    setPattern(newPattern);
    setUserPattern(Array(GRID_SIZE * GRID_SIZE).fill(false));
    setPhase('showing');
    setRound(0);
    setCorrectRounds(0);

    setTimeout(() => {
      setPhase('input');
    }, DISPLAY_TIME);
  };

  const startNewRound = () => {
    const newPattern = generatePattern();
    setPattern(newPattern);
    setUserPattern(Array(GRID_SIZE * GRID_SIZE).fill(false));
    setPhase('showing');

    setTimeout(() => {
      setPhase('input');
    }, DISPLAY_TIME);
  };

  const toggleCell = (index: number) => {
    if (phase !== 'input') return;
    const newUserPattern = [...userPattern];
    newUserPattern[index] = !newUserPattern[index];
    setUserPattern(newUserPattern);
  };

  const submitPattern = () => {
    const isCorrect = pattern.every((val, idx) => val === userPattern[idx]);
    if (isCorrect) {
      setCorrectRounds(correctRounds + 1);
    }

    const newRound = round + 1;
    setRound(newRound);

    if (newRound >= TOTAL_ROUNDS) {
      const accuracy = (correctRounds + (isCorrect ? 1 : 0)) / TOTAL_ROUNDS * 100;
      const score = accuracy * difficulty;

      addSession({
        id: `pattern-${Date.now()}`,
        exerciseType: 'pattern-recognition',
        score,
        accuracy,
        duration: TOTAL_ROUNDS * 3,
        difficulty,
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
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Pattern Recognition</h1>
          <p className="text-text-secondary mb-6">
            Study the pattern briefly, then recreate it from memory.
          </p>

          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-semibold mb-2">How to Play:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-text-secondary">
                <li>A pattern will be displayed for {DISPLAY_TIME/1000} seconds</li>
                <li>Memorize which cells are filled</li>
                <li>Recreate the pattern by clicking cells</li>
                <li>Submit your answer and repeat for {TOTAL_ROUNDS} rounds</li>
              </ol>
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
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Complete!</h1>
            <p className="text-text-secondary mb-8">You got {correctRounds} out of {TOTAL_ROUNDS} patterns correct</p>
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
            {phase === 'showing' ? 'Memorize This Pattern' : 'Recreate the Pattern'}
          </h2>
          <p className="text-sm text-text-secondary">
            {phase === 'showing' ? 'Study carefully...' : 'Click cells to toggle them on/off'}
          </p>
        </div>

        {/* Pattern Grid */}
        <div className="max-w-md mx-auto mb-6">
          <div className="grid grid-cols-4 gap-2 md:gap-3">
            {(phase === 'showing' ? pattern : userPattern).map((filled, index) => (
              <button
                key={index}
                onClick={() => toggleCell(index)}
                disabled={phase !== 'input'}
                className={`
                  aspect-square rounded-lg transition-all
                  ${filled ? 'bg-primary' : 'bg-surface border-2 border-gray-700'}
                  ${phase === 'input' ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}
                `}
                aria-label={`Cell ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {phase === 'input' && (
          <Button onClick={submitPattern} size="lg" className="w-full">
            Submit Pattern
          </Button>
        )}
      </Card>
    </div>
  );
}
