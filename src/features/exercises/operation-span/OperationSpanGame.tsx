import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useProgressStore } from '@/store/useProgressStore';
import { useUserStore } from '@/store/useUserStore';
import { ArrowLeft, Play, Home, Check, X } from 'lucide-react';

const LETTERS = ['F', 'H', 'J', 'K', 'L', 'N', 'P', 'Q', 'R', 'S', 'T', 'Y'];
const TOTAL_ROUNDS = 5;

interface MathProblem {
  question: string;
  answer: number;
  correct: boolean;
}

export default function OperationSpanGame() {
  const navigate = useNavigate();
  const addSession = useProgressStore((state) => state.addSession);
  const addXP = useUserStore((state) => state.addXP);
  const updateStreak = useUserStore((state) => state.updateStreak);
  const exerciseStats = useProgressStore((state) => state.stats.exerciseProgress['operation-span']);

  const [phase, setPhase] = useState<'ready' | 'math' | 'recall' | 'results'>('ready');
  const [round, setRound] = useState(0);
  const [sequenceLength] = useState(exerciseStats.currentDifficulty || 3);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [mathProblems, setMathProblems] = useState<MathProblem[]>([]);
  const [letters, setLetters] = useState<string[]>([]);
  const [recalledLetters, setRecalledLetters] = useState<string[]>([]);

  const [correctMath, setCorrectMath] = useState(0);
  const [correctRecalls, setCorrectRecalls] = useState(0);
  const [totalMath, setTotalMath] = useState(0);

  const generateMathProblem = useCallback((): MathProblem => {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let a, b, result;

    if (operation === '*') {
      a = Math.floor(Math.random() * 9) + 2;
      b = Math.floor(Math.random() * 9) + 2;
      result = a * b;
    } else if (operation === '+') {
      a = Math.floor(Math.random() * 20) + 5;
      b = Math.floor(Math.random() * 20) + 5;
      result = a + b;
    } else {
      a = Math.floor(Math.random() * 30) + 10;
      b = Math.floor(Math.random() * a);
      result = a - b;
    }

    // 50% chance to show correct answer
    const showCorrect = Math.random() < 0.5;
    const displayedAnswer = showCorrect ? result : result + (Math.random() < 0.5 ? 1 : -1);

    return {
      question: `${a} ${operation} ${b} = ${displayedAnswer}`,
      answer: displayedAnswer,
      correct: showCorrect,
    };
  }, []);

  const startGame = () => {
    const problems: MathProblem[] = [];
    const letterSeq: string[] = [];

    for (let i = 0; i < sequenceLength; i++) {
      problems.push(generateMathProblem());
      letterSeq.push(LETTERS[Math.floor(Math.random() * LETTERS.length)]);
    }

    setMathProblems(problems);
    setLetters(letterSeq);
    setCurrentIndex(0);
    setRecalledLetters([]);
    setPhase('math');
    setRound(0);
    setCorrectMath(0);
    setCorrectRecalls(0);
    setTotalMath(0);
  };

  const handleMathResponse = (isCorrect: boolean) => {
    const problem = mathProblems[currentIndex];
    const answeredCorrectly = isCorrect === problem.correct;

    if (answeredCorrectly) {
      setCorrectMath(correctMath + 1);
    }
    setTotalMath(totalMath + 1);

    if (currentIndex < mathProblems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setPhase('recall');
    }
  };

  const handleLetterClick = (letter: string) => {
    if (phase !== 'recall') return;
    setRecalledLetters([...recalledLetters, letter]);
  };

  const handleSubmitRecall = () => {
    const isCorrect = recalledLetters.length === letters.length &&
                      recalledLetters.every((letter, idx) => letter === letters[idx]);

    if (isCorrect) {
      setCorrectRecalls(correctRecalls + 1);
    }

    const newRound = round + 1;
    setRound(newRound);

    if (newRound >= TOTAL_ROUNDS) {
      const mathAccuracy = (correctMath / totalMath) * 100;
      const recallAccuracy = (correctRecalls + (isCorrect ? 1 : 0)) / TOTAL_ROUNDS * 100;
      const overallAccuracy = (mathAccuracy + recallAccuracy) / 2;
      const score = overallAccuracy * sequenceLength;

      addSession({
        id: `operation-${Date.now()}`,
        exerciseType: 'operation-span',
        score,
        accuracy: overallAccuracy,
        duration: TOTAL_ROUNDS * sequenceLength * 5,
        difficulty: sequenceLength,
        trialsCompleted: TOTAL_ROUNDS,
        reactionTime: 0,
        timestamp: new Date(),
      });

      addXP(Math.round(score));
      updateStreak();
      setPhase('results');
    } else {
      // Start next round
      const problems: MathProblem[] = [];
      const letterSeq: string[] = [];

      for (let i = 0; i < sequenceLength; i++) {
        problems.push(generateMathProblem());
        letterSeq.push(LETTERS[Math.floor(Math.random() * LETTERS.length)]);
      }

      setMathProblems(problems);
      setLetters(letterSeq);
      setCurrentIndex(0);
      setRecalledLetters([]);
      setPhase('math');
    }
  };

  const mathAccuracy = totalMath > 0 ? (correctMath / totalMath) * 100 : 0;
  const recallAccuracy = round > 0 ? (correctRecalls / round) * 100 : 0;

  if (phase === 'ready') {
    return (
      <div className="max-w-4xl mx-auto">
        <Button onClick={() => navigate('/exercises')} variant="outline" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Exercises
        </Button>

        <Card className="p-6 md:p-8 bg-surface">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Operation Span</h1>
          <p className="text-text-secondary mb-6">
            Test your working memory under cognitive load by solving math problems while remembering letters.
          </p>

          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-semibold mb-2">How to Play:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-text-secondary">
                <li>Solve each math problem (click ✓ if correct, ✗ if incorrect)</li>
                <li>After each problem, remember the letter shown</li>
                <li>After all problems, recall the letters in order</li>
                <li>Complete {TOTAL_ROUNDS} rounds</li>
              </ol>
            </div>

            <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
              <p className="text-sm">
                <span className="font-semibold">Current Level:</span> {sequenceLength} items
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
              {mathAccuracy + recallAccuracy >= 160 ? '🎉' : mathAccuracy + recallAccuracy >= 120 ? '👍' : '💪'}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Training Complete!</h1>
            <p className="text-text-secondary mb-8">Great job managing dual cognitive tasks</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="p-6 bg-background">
              <p className="text-sm text-text-secondary mb-1">Math Accuracy</p>
              <p className="text-3xl font-bold text-primary">{Math.round(mathAccuracy)}%</p>
            </Card>

            <Card className="p-6 bg-background">
              <p className="text-sm text-text-secondary mb-1">Recall Accuracy</p>
              <p className="text-3xl font-bold text-success">{Math.round(recallAccuracy)}%</p>
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

  if (phase === 'recall') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">Round {round + 1} of {TOTAL_ROUNDS}</span>
            <span className="text-sm text-text-secondary">Recall: {correctRecalls}/{round}</span>
          </div>
          <Progress value={(round / TOTAL_ROUNDS) * 100} className="h-2" />
        </div>

        <Card className="p-6 md:p-8 bg-surface">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-2">Recall the Letters</h2>
            <p className="text-sm text-text-secondary">Click letters in the order they appeared</p>
          </div>

          {/* Selected letters */}
          <div className="mb-6 min-h-[60px] p-4 bg-background rounded-lg">
            <div className="flex flex-wrap gap-2 justify-center">
              {recalledLetters.map((letter, idx) => (
                <div key={idx} className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-xl font-bold">
                  {letter}
                </div>
              ))}
              {recalledLetters.length === 0 && (
                <p className="text-sm text-text-secondary">Select {sequenceLength} letters</p>
              )}
            </div>
          </div>

          {/* Letter grid */}
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2 md:gap-3 mb-6">
            {LETTERS.map((letter) => (
              <button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                disabled={recalledLetters.length >= sequenceLength}
                className="aspect-square bg-surface border-2 border-border rounded-lg text-xl font-bold hover:bg-surface/80 hover:border-primary/50 transition-all disabled:opacity-50"
              >
                {letter}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setRecalledLetters(recalledLetters.slice(0, -1))}
              variant="outline"
              disabled={recalledLetters.length === 0}
              className="flex-1"
            >
              Clear Last
            </Button>
            <Button
              onClick={handleSubmitRecall}
              disabled={recalledLetters.length !== sequenceLength}
              className="flex-1"
            >
              Submit
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Math phase
  const currentProblem = mathProblems[currentIndex];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold">Round {round + 1} of {TOTAL_ROUNDS}</span>
          <span className="text-sm text-text-secondary">Math: {correctMath}/{totalMath}</span>
        </div>
        <Progress value={((currentIndex + 1) / mathProblems.length) * 100} className="h-2" />
      </div>

      <Card className="p-6 md:p-8 bg-surface">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Is this equation correct?</h2>
          <p className="text-sm text-text-secondary">Then remember the letter below</p>
        </div>

        {/* Math Problem */}
        <div className="mb-8 p-8 bg-background rounded-lg">
          <p className="text-3xl md:text-4xl font-bold text-center mb-4">{currentProblem.question}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => handleMathResponse(true)} size="lg" className="bg-success hover:bg-success/90 px-8">
              <Check className="w-6 h-6 mr-2" />
              Correct
            </Button>
            <Button onClick={() => handleMathResponse(false)} size="lg" variant="destructive" className="px-8">
              <X className="w-6 h-6 mr-2" />
              Incorrect
            </Button>
          </div>
        </div>

        {/* Letter to remember */}
        <div className="p-6 bg-primary/20 border-2 border-primary/50 rounded-lg">
          <p className="text-sm text-center mb-2 text-text-secondary">Remember this letter:</p>
          <p className="text-5xl md:text-6xl font-bold text-center text-primary">{letters[currentIndex]}</p>
        </div>
      </Card>
    </div>
  );
}
