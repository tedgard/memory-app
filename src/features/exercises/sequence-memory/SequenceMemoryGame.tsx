import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useProgressStore } from '@/store/useProgressStore';
import { useUserStore } from '@/store/useUserStore';
import useSequenceMemory from './useSequenceMemory';
import { ArrowLeft, Play, Home } from 'lucide-react';

export default function SequenceMemoryGame() {
  const navigate = useNavigate();
  const addSession = useProgressStore((state) => state.addSession);
  const addXP = useUserStore((state) => state.addXP);
  const updateStreak = useUserStore((state) => state.updateStreak);

  const {
    sequenceLength,
    currentPhase,
    sequence,
    userSequence,
    showingIndex,
    colors,
    results,
    round,
    totalRounds,
    correctRounds,
    startGame,
    handleColorClick,
  } = useSequenceMemory();

  const handleFinish = () => {
    if (results) {
      // Save session
      addSession({
        id: `sequence-${Date.now()}`,
        exerciseType: 'sequence-memory',
        score: results.score,
        accuracy: results.accuracy,
        duration: sequenceLength * totalRounds * 2,
        difficulty: sequenceLength,
        trialsCompleted: totalRounds,
        reactionTime: 0,
        timestamp: new Date(),
      });

      // Add XP
      addXP(Math.round(results.score));

      // Update streak
      updateStreak();
    }

    navigate('/');
  };

  if (currentPhase === 'ready') {
    return (
      <div className="max-w-4xl mx-auto">
        <Button
          onClick={() => navigate('/exercises')}
          variant="outline"
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Exercises
        </Button>

        <Card className="p-6 md:p-8 bg-surface">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Sequence Memory</h1>
          <p className="text-text-secondary mb-6">
            Watch the sequence of colors carefully, then reproduce them in the correct order.
          </p>

          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-semibold mb-2">How to Play:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-text-secondary">
                <li>Watch as colors light up in sequence</li>
                <li>Memorize the order</li>
                <li>Click the colors in the same order</li>
                <li>Complete {totalRounds} rounds</li>
              </ol>
            </div>

            <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
              <p className="text-sm">
                <span className="font-semibold">Current Level:</span> {sequenceLength} colors
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

  if (currentPhase === 'results' && results) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 md:p-8 bg-surface">
          <div className="text-center">
            <div className="text-6xl mb-4">
              {results.accuracy >= 80 ? '🎉' : results.accuracy >= 60 ? '👍' : '💪'}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Round Complete!</h1>
            <p className="text-text-secondary mb-8">Great job on completing the sequence memory challenge</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6 bg-background">
              <p className="text-sm text-text-secondary mb-1">Score</p>
              <p className="text-3xl font-bold text-primary">{Math.round(results.score)}</p>
            </Card>

            <Card className="p-6 bg-background">
              <p className="text-sm text-text-secondary mb-1">Accuracy</p>
              <p className="text-3xl font-bold text-success">{Math.round(results.accuracy)}%</p>
            </Card>

            <Card className="p-6 bg-background">
              <p className="text-sm text-text-secondary mb-1">Correct Rounds</p>
              <p className="text-3xl font-bold text-secondary">{correctRounds}/{totalRounds}</p>
            </Card>
          </div>

          <div className="space-y-3">
            <Button onClick={startGame} size="lg" className="w-full">
              <Play className="w-5 h-5 mr-2" />
              Play Again
            </Button>
            <Button onClick={handleFinish} variant="outline" size="lg" className="w-full">
              <Home className="w-5 h-5 mr-2" />
              Return to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Game in progress
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold">
            Round {round + 1} of {totalRounds}
          </span>
          <span className="text-sm text-text-secondary">
            Correct: {correctRounds}
          </span>
        </div>
        <Progress value={((round) / totalRounds) * 100} className="h-2" />
      </div>

      <Card className="p-6 md:p-8 bg-surface">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            {currentPhase === 'showing' ? 'Watch Carefully...' : 'Your Turn!'}
          </h2>
          <p className="text-sm text-text-secondary">
            {currentPhase === 'showing'
              ? 'Memorize the sequence'
              : `Click ${sequence.length} ${sequence.length === 1 ? 'color' : 'colors'} in order (${userSequence.length}/${sequence.length})`}
          </p>
        </div>

        {/* Color Grid */}
        <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-lg mx-auto">
          {colors.map((color, index) => {
            // Check if this color should be showing during the sequence display
            const isShowing = currentPhase === 'showing' &&
                             showingIndex >= 0 &&
                             sequence[showingIndex] === index;

            // Check if user has clicked this color in their current attempt
            const clickCount = userSequence.filter(c => c === index).length;
            const isJustClicked = userSequence.length > 0 && userSequence[userSequence.length - 1] === index;

            return (
              <button
                key={index}
                onClick={() => handleColorClick(index)}
                disabled={currentPhase !== 'input'}
                className={`
                  aspect-square rounded-lg transition-all duration-200
                  ${currentPhase === 'input' ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
                  ${isShowing ? 'scale-110 shadow-lg' : ''}
                  ${isJustClicked ? 'ring-2 ring-white' : ''}
                `}
                style={{
                  backgroundColor: color,
                  opacity: isShowing ? 1 : currentPhase === 'showing' ? 0.3 : 0.7,
                }}
                aria-label={`Color ${index + 1}`}
              />
            );
          })}
        </div>

        {currentPhase === 'input' && (
          <div className="mt-6 text-center">
            <p className="text-xs text-text-secondary">
              Sequence Length: {sequenceLength} {sequenceLength === 1 ? 'color' : 'colors'}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
