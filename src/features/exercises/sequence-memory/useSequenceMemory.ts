import { useState, useEffect, useCallback } from 'react';
import { useProgressStore } from '@/store/useProgressStore';

const COLORS = [
  '#6366f1', // Indigo
  '#8b5cf6', // Purple
  '#10b981', // Green
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#3b82f6', // Blue
  '#ec4899', // Pink
  '#14b8a6', // Teal
];

const DISPLAY_TIME = 800; // ms per item
const PAUSE_TIME = 500; // ms before user input

interface GameResults {
  score: number;
  accuracy: number;
  sequenceLength: number;
}

export default function useSequenceMemory() {
  const exerciseStats = useProgressStore((state) => state.stats.exerciseProgress['sequence-memory']);

  const [sequenceLength] = useState(() => {
    return exerciseStats.currentDifficulty || 3;
  });

  // Game state
  const [currentPhase, setCurrentPhase] = useState<'ready' | 'showing' | 'input' | 'results'>('ready');
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [showingIndex, setShowingIndex] = useState(-1);
  const [results, setResults] = useState<GameResults | null>(null);
  const [round, setRound] = useState(0);
  const [correctRounds, setCorrectRounds] = useState(0);
  const totalRounds = 5;

  const generateSequence = useCallback(() => {
    const newSequence: number[] = [];
    for (let i = 0; i < sequenceLength; i++) {
      newSequence.push(Math.floor(Math.random() * COLORS.length));
    }
    return newSequence;
  }, [sequenceLength]);

  const startGame = useCallback(() => {
    const newSequence = generateSequence();
    setSequence(newSequence);
    setUserSequence([]);
    setCurrentPhase('showing');
    setShowingIndex(-1);
    setRound(0);
    setCorrectRounds(0);
    setResults(null);
  }, [generateSequence]);

  const startNewRound = useCallback(() => {
    const newSequence = generateSequence();
    setSequence(newSequence);
    setUserSequence([]);
    setCurrentPhase('showing');
    setShowingIndex(-1);
  }, [generateSequence]);

  // Show sequence animation
  useEffect(() => {
    if (currentPhase !== 'showing' || sequence.length === 0) return;

    if (showingIndex === -1) {
      // Start showing first item
      const timer = setTimeout(() => {
        setShowingIndex(0);
      }, 300);
      return () => clearTimeout(timer);
    }

    if (showingIndex < sequence.length - 1) {
      // Show next item
      const timer = setTimeout(() => {
        setShowingIndex(showingIndex + 1);
      }, DISPLAY_TIME);
      return () => clearTimeout(timer);
    } else if (showingIndex === sequence.length - 1) {
      // Finished showing last item, wait then go to input
      const timer = setTimeout(() => {
        setShowingIndex(-1);
        setCurrentPhase('input');
      }, DISPLAY_TIME + PAUSE_TIME);
      return () => clearTimeout(timer);
    }
  }, [currentPhase, showingIndex, sequence.length]);

  const handleColorClick = useCallback((colorIndex: number) => {
    if (currentPhase !== 'input') return;

    const newUserSequence = [...userSequence, colorIndex];
    setUserSequence(newUserSequence);

    // Check if sequence is complete
    if (newUserSequence.length === sequence.length) {
      // Check if correct
      const isCorrect = newUserSequence.every((val, idx) => val === sequence[idx]);

      if (isCorrect) {
        setCorrectRounds(correctRounds + 1);
      }

      const newRound = round + 1;
      setRound(newRound);

      if (newRound >= totalRounds) {
        // Game finished
        const accuracy = (correctRounds + (isCorrect ? 1 : 0)) / totalRounds * 100;
        const score = accuracy * sequenceLength;

        setResults({
          score,
          accuracy,
          sequenceLength,
        });
        setCurrentPhase('results');
      } else {
        // Next round
        setTimeout(() => {
          startNewRound();
        }, 1000);
      }
    }
  }, [currentPhase, userSequence, sequence, round, correctRounds, sequenceLength, startNewRound]);

  return {
    sequenceLength,
    currentPhase,
    sequence,
    userSequence,
    showingIndex,
    colors: COLORS,
    results,
    round,
    totalRounds,
    correctRounds,
    startGame,
    handleColorClick,
  };
}
