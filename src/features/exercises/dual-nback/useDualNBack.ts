import { useState, useEffect, useCallback, useRef } from 'react';
import { useProgressStore } from '@/store/useProgressStore';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const GRID_SIZE = 9; // 3x3 grid
const STIMULUS_DURATION = 500; // ms to show stimulus
const INTERVAL_DURATION = 2500; // ms between stimuli

interface GameResults {
  score: number;
  overallAccuracy: number;
  visualAccuracy: number;
  audioAccuracy: number;
}

export default function useDualNBack() {
  const exerciseStats = useProgressStore((state) => state.stats.exerciseProgress['dual-nback']);

  // Game configuration
  const [nLevel] = useState(() => {
    // Start with difficulty from progress store, default to 2
    return exerciseStats.currentDifficulty || 2;
  });
  const [totalTrials] = useState(20 + nLevel * 2); // More trials for higher N

  // Game state
  const [currentTrial, setCurrentTrial] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visualPosition, setVisualPosition] = useState<number | null>(null);
  const [audioLetter, setAudioLetter] = useState<string | null>(null);

  // History tracking
  const visualHistory = useRef<number[]>([]);
  const audioHistory = useRef<string[]>([]);

  // Match tracking
  const [visualMatches, setVisualMatches] = useState<number[]>([]);
  const [audioMatches, setAudioMatches] = useState<number[]>([]);

  // Response tracking
  const [userVisualResponses, setUserVisualResponses] = useState<number[]>([]);
  const [userAudioResponses, setUserAudioResponses] = useState<number[]>([]);
  const [correctVisual, setCorrectVisual] = useState(0);
  const [correctAudio, setCorrectAudio] = useState(0);
  const [falsePositives, setFalsePositives] = useState(0);

  // Results
  const [results, setResults] = useState<GameResults | null>(null);

  // Generate sequence at start
  const sequence = useRef<{ visual: number[]; audio: string[] }>({ visual: [], audio: [] });

  const generateSequence = useCallback(() => {
    const visual: number[] = [];
    const audio: string[] = [];
    const matches: { visual: number[]; audio: number[] } = { visual: [], audio: [] };

    // Generate random sequence with some guaranteed matches
    for (let i = 0; i < totalTrials; i++) {
      // 30% chance of match after N trials
      const shouldVisualMatch = i >= nLevel && Math.random() < 0.3;
      const shouldAudioMatch = i >= nLevel && Math.random() < 0.3;

      visual.push(
        shouldVisualMatch ? visual[i - nLevel] : Math.floor(Math.random() * GRID_SIZE)
      );

      audio.push(
        shouldAudioMatch ? audio[i - nLevel] : LETTERS[Math.floor(Math.random() * LETTERS.length)]
      );

      // Track actual matches
      if (i >= nLevel) {
        if (visual[i] === visual[i - nLevel]) {
          matches.visual.push(i);
        }
        if (audio[i] === audio[i - nLevel]) {
          matches.audio.push(i);
        }
      }
    }

    sequence.current = { visual, audio };
    setVisualMatches(matches.visual);
    setAudioMatches(matches.audio);
  }, [nLevel, totalTrials]);

  const startGame = useCallback(() => {
    generateSequence();
    setCurrentTrial(0);
    setIsPlaying(true);
  }, [generateSequence]);

  const handleVisualMatch = useCallback(() => {
    if (!isPlaying || currentTrial < 0) return;

    setUserVisualResponses((prev) => [...prev, currentTrial]);

    // Check if correct
    if (visualMatches.includes(currentTrial)) {
      setCorrectVisual((prev) => prev + 1);
    } else {
      setFalsePositives((prev) => prev + 1);
    }
  }, [isPlaying, currentTrial, visualMatches]);

  const handleAudioMatch = useCallback(() => {
    if (!isPlaying || currentTrial < 0) return;

    setUserAudioResponses((prev) => [...prev, currentTrial]);

    // Check if correct
    if (audioMatches.includes(currentTrial)) {
      setCorrectAudio((prev) => prev + 1);
    } else {
      setFalsePositives((prev) => prev + 1);
    }
  }, [isPlaying, currentTrial, audioMatches]);

  // Game loop
  useEffect(() => {
    if (!isPlaying || currentTrial < 0 || currentTrial >= totalTrials) return;

    // Show stimulus
    const visual = sequence.current.visual[currentTrial];
    const audio = sequence.current.audio[currentTrial];

    setVisualPosition(visual);
    setAudioLetter(audio);

    visualHistory.current.push(visual);
    audioHistory.current.push(audio);

    // Speak the letter using Web Speech API
    if ('speechSynthesis' in window && audio) {
      // Convert to lowercase to avoid "Capital" announcement
      const utterance = new SpeechSynthesisUtterance(audio.toLowerCase());
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      // Cancel any ongoing speech and speak the new letter
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }

    // Hide stimulus after duration
    const hideTimer = setTimeout(() => {
      setVisualPosition(null);
      setAudioLetter(null);
    }, STIMULUS_DURATION);

    // Move to next trial
    const nextTimer = setTimeout(() => {
      if (currentTrial + 1 < totalTrials) {
        setCurrentTrial((prev) => prev + 1);
      } else {
        // Game finished
        setIsPlaying(false);
        calculateResults();
      }
    }, INTERVAL_DURATION);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [isPlaying, currentTrial, totalTrials]);

  const calculateResults = useCallback(() => {
    const visualAcc = visualMatches.length > 0 ? (correctVisual / visualMatches.length) * 100 : 100;
    const audioAcc = audioMatches.length > 0 ? (correctAudio / audioMatches.length) * 100 : 100;
    const overallAcc = (visualAcc + audioAcc) / 2;

    // Calculate score with level multiplier and false positive penalty
    const baseScore = overallAcc;
    const levelMultiplier = Math.pow(1.5, nLevel - 1);
    const fpPenalty = falsePositives * 2;
    const score = Math.max(0, baseScore * levelMultiplier - fpPenalty);

    setResults({
      score,
      overallAccuracy: overallAcc,
      visualAccuracy: visualAcc,
      audioAccuracy: audioAcc,
    });
  }, [visualMatches, audioMatches, correctVisual, correctAudio, falsePositives, nLevel]);

  return {
    nLevel,
    currentTrial,
    totalTrials,
    visualPosition,
    audioLetter,
    isPlaying,
    visualMatches,
    audioMatches,
    userVisualResponses,
    userAudioResponses,
    correctVisual,
    correctAudio,
    falsePositives,
    results,
    startGame,
    handleVisualMatch,
    handleAudioMatch,
  };
}
