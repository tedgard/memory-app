import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useProgressStore } from '@/store/useProgressStore';
import { useUserStore } from '@/store/useUserStore';
import useDualNBack from './useDualNBack';
import VisualGrid from './VisualGrid';

export default function DualNBackGame() {
  const navigate = useNavigate();
  const addSession = useProgressStore((state) => state.addSession);
  const addXP = useUserStore((state) => state.addXP);
  const updateStreak = useUserStore((state) => state.updateStreak);

  const [hasStarted, setHasStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const {
    nLevel,
    currentTrial,
    totalTrials,
    visualPosition,
    audioLetter,
    isPlaying,
    visualMatches,
    audioMatches,
    correctVisual,
    correctAudio,
    falsePositives,
    startGame,
    handleVisualMatch,
    handleAudioMatch,
    results,
  } = useDualNBack();

  const progress = (currentTrial / totalTrials) * 100;

  useEffect(() => {
    if (results && !showResults) {
      setShowResults(true);

      // Save session to progress store
      const session = {
        id: crypto.randomUUID(),
        exerciseType: 'dual-nback' as const,
        difficulty: nLevel,
        duration: totalTrials * 3, // Approximate seconds
        trialsCompleted: totalTrials,
        accuracy: results.overallAccuracy,
        reactionTime: 0,
        score: results.score,
        timestamp: new Date(),
        nBackLevel: nLevel,
        visualAccuracy: results.visualAccuracy,
        audioAccuracy: results.audioAccuracy,
        falsePositives,
      };

      addSession(session);

      // Calculate XP (10 base + score bonus)
      const xp = Math.floor(10 + results.score / 10);
      addXP(xp);

      // Update streak
      updateStreak();
    }
  }, [results, showResults]);

  const handleStart = () => {
    setHasStarted(true);
    startGame();
  };

  const handlePlayAgain = () => {
    setShowResults(false);
    setHasStarted(false);
  };

  const handleExit = () => {
    navigate('/exercises');
  };

  if (!hasStarted) {
    return (
      <div className="max-w-4xl mx-auto">
        <Button variant="outline" onClick={handleExit} className="mb-4">
          ← Back to Exercises
        </Button>

        <Card className="p-8 bg-surface">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🧩</div>
            <h1 className="text-3xl font-bold mb-2">Dual N-Back Training</h1>
            <p className="text-text-secondary">
              The gold standard for working memory enhancement
            </p>
          </div>

          <div className="mb-8 space-y-4">
            <div>
              <h2 className="text-xl font-bold mb-2">How It Works</h2>
              <ul className="space-y-2 text-text-secondary">
                <li>• You'll see positions on a 3×3 grid and hear letters (A-H)</li>
                <li>• Press "Visual Match" when the current position matches {nLevel} steps back</li>
                <li>• Press "Audio Match" when the current letter matches {nLevel} steps back</li>
                <li>• Both can match simultaneously - press both buttons!</li>
                <li>• You have {totalTrials} trials to complete</li>
              </ul>
            </div>

            <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="font-semibold mb-1">Current Level: {nLevel}-Back</p>
              <p className="text-sm text-text-secondary">
                Remember positions and letters from {nLevel} step{nLevel > 1 ? 's' : ''} ago
              </p>
            </div>

            <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
              <p className="font-semibold mb-1">💡 Pro Tip</p>
              <p className="text-sm text-text-secondary">
                Focus on accuracy over speed. The difficulty will adapt to your performance.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={handleExit} size="lg" className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleStart} size="lg" className="flex-1 bg-primary hover:bg-primary/90">
              Start Training
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (showResults && results) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 bg-surface">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">
              {results.overallAccuracy >= 85 ? '🎉' : results.overallAccuracy >= 70 ? '👍' : '💪'}
            </div>
            <h1 className="text-3xl font-bold mb-2">Session Complete!</h1>
            <p className="text-text-secondary">Here's how you performed</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <Card className="p-6 bg-background text-center">
              <p className="text-sm text-text-secondary mb-1">Overall Score</p>
              <p className="text-4xl font-bold text-primary">{Math.round(results.score)}</p>
            </Card>

            <Card className="p-6 bg-background text-center">
              <p className="text-sm text-text-secondary mb-1">Overall Accuracy</p>
              <p className="text-4xl font-bold text-success">{Math.round(results.overallAccuracy)}%</p>
            </Card>

            <Card className="p-6 bg-background text-center">
              <p className="text-sm text-text-secondary mb-1">Visual Accuracy</p>
              <p className="text-2xl font-bold">{Math.round(results.visualAccuracy)}%</p>
              <p className="text-xs text-text-secondary mt-1">
                {correctVisual}/{visualMatches.length} correct
              </p>
            </Card>

            <Card className="p-6 bg-background text-center">
              <p className="text-sm text-text-secondary mb-1">Audio Accuracy</p>
              <p className="text-2xl font-bold">{Math.round(results.audioAccuracy)}%</p>
              <p className="text-xs text-text-secondary mt-1">
                {correctAudio}/{audioMatches.length} correct
              </p>
            </Card>
          </div>

          <div className="mb-8">
            <Card className="p-6 bg-background">
              <h3 className="font-semibold mb-4">Performance Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">N-Back Level:</span>
                  <span className="font-semibold">{nLevel}-Back</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Trials Completed:</span>
                  <span className="font-semibold">{totalTrials}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">False Positives:</span>
                  <span className="font-semibold">{falsePositives}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">XP Earned:</span>
                  <span className="font-semibold text-primary">+{Math.floor(10 + results.score / 10)} XP</span>
                </div>
              </div>
            </Card>
          </div>

          {results.overallAccuracy >= 85 && (
            <div className="mb-6 p-4 bg-success/10 border border-success/30 rounded-lg text-center">
              <p className="font-semibold text-success">🎯 Excellent Performance!</p>
              <p className="text-sm text-text-secondary mt-1">
                Consider increasing the difficulty for your next session
              </p>
            </div>
          )}

          {results.overallAccuracy < 60 && (
            <div className="mb-6 p-4 bg-warning/10 border border-warning/30 rounded-lg text-center">
              <p className="font-semibold text-warning">Keep Practicing!</p>
              <p className="text-sm text-text-secondary mt-1">
                Consistency is key - you'll see improvement with regular training
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <Button variant="outline" onClick={handleExit} size="lg" className="flex-1">
              Exit
            </Button>
            <Button onClick={handlePlayAgain} size="lg" className="flex-1 bg-primary hover:bg-primary/90">
              Play Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-4 md:p-8 bg-surface">
        {/* Progress Header */}
        <div className="mb-4 md:mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs md:text-sm font-semibold">{nLevel}-Back Training</span>
            <span className="text-xs md:text-sm text-text-secondary">
              Trial {currentTrial + 1} / {totalTrials}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Visual Grid */}
        <div className="mb-6 md:mb-8">
          <VisualGrid position={visualPosition} />
        </div>

        {/* Audio Display */}
        <div className="mb-6 md:mb-8 text-center">
          <div className="inline-block p-4 md:p-8 bg-background rounded-lg">
            <p className="text-xs md:text-sm text-text-secondary mb-2">Current Letter</p>
            <p className="text-5xl md:text-6xl font-bold text-primary">
              {audioLetter || '-'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
          <Button
            onClick={handleVisualMatch}
            disabled={!isPlaying}
            size="lg"
            className="h-auto py-4 md:py-6 flex flex-col items-center justify-center bg-secondary hover:bg-secondary/90"
          >
            <span className="text-base md:text-lg font-semibold">Visual Match</span>
            <span className="text-xs md:text-sm opacity-75 mt-1">Position {nLevel} back</span>
          </Button>

          <Button
            onClick={handleAudioMatch}
            disabled={!isPlaying}
            size="lg"
            className="h-auto py-4 md:py-6 flex flex-col items-center justify-center bg-primary hover:bg-primary/90"
          >
            <span className="text-base md:text-lg font-semibold">Audio Match</span>
            <span className="text-xs md:text-sm opacity-75 mt-1">Letter {nLevel} back</span>
          </Button>
        </div>

        {/* Stats Display */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
          <div>
            <p className="text-xs md:text-sm text-text-secondary">Visual Correct</p>
            <p className="text-xl md:text-2xl font-bold text-success">{correctVisual}</p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-text-secondary">Audio Correct</p>
            <p className="text-xl md:text-2xl font-bold text-primary">{correctAudio}</p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-text-secondary">False Positives</p>
            <p className="text-xl md:text-2xl font-bold text-error">{falsePositives}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
