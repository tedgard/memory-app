import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/store/useUserStore';
import { UserGoal, ExperienceLevel } from '@/types/user';
import Footer from '@/components/layout/Footer';

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState<UserGoal>('memory');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('beginner');

  const { createProfile, completeOnboarding } = useUserStore();

  const handleComplete = () => {
    createProfile(name, goal, experienceLevel);
    completeOnboarding();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full p-8 bg-surface">
        {step === 1 && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Welcome to MemoryApp 🧠</h1>
            <p className="text-text-secondary mb-6">
              Boost your working memory and fluid intelligence through scientifically-backed cognitive exercises.
            </p>
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">What's your name?</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your name"
              />
            </div>
            <Button
              onClick={() => setStep(2)}
              disabled={!name.trim()}
              size="lg"
              className="w-full"
            >
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">What's your primary goal?</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setGoal('focus')}
                className={`p-6 rounded-lg border-2 transition-colors text-left ${
                  goal === 'focus'
                    ? 'border-primary bg-primary/20'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="text-3xl mb-2">🎯</div>
                <p className="font-semibold">Improve Focus</p>
                <p className="text-sm text-text-secondary">Better concentration and attention</p>
              </button>

              <button
                onClick={() => setGoal('learning')}
                className={`p-6 rounded-lg border-2 transition-colors text-left ${
                  goal === 'learning'
                    ? 'border-primary bg-primary/20'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="text-3xl mb-2">📚</div>
                <p className="font-semibold">Learn Faster</p>
                <p className="text-sm text-text-secondary">Enhanced learning ability</p>
              </button>

              <button
                onClick={() => setGoal('memory')}
                className={`p-6 rounded-lg border-2 transition-colors text-left ${
                  goal === 'memory'
                    ? 'border-primary bg-primary/20'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="text-3xl mb-2">🧠</div>
                <p className="font-semibold">Boost Memory</p>
                <p className="text-sm text-text-secondary">Remember more information</p>
              </button>

              <button
                onClick={() => setGoal('intelligence')}
                className={`p-6 rounded-lg border-2 transition-colors text-left ${
                  goal === 'intelligence'
                    ? 'border-primary bg-primary/20'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="text-3xl mb-2">💡</div>
                <p className="font-semibold">Increase Intelligence</p>
                <p className="text-sm text-text-secondary">Enhance fluid intelligence</p>
              </button>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setStep(1)} variant="outline" size="lg">
                Back
              </Button>
              <Button onClick={() => setStep(3)} size="lg" className="flex-1">
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">What's your experience level?</h2>
            <div className="space-y-3 mb-6">
              <button
                onClick={() => setExperienceLevel('beginner')}
                className={`w-full p-6 rounded-lg border-2 transition-colors text-left ${
                  experienceLevel === 'beginner'
                    ? 'border-primary bg-primary/20'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <p className="font-semibold">Beginner</p>
                <p className="text-sm text-text-secondary">New to cognitive training</p>
              </button>

              <button
                onClick={() => setExperienceLevel('intermediate')}
                className={`w-full p-6 rounded-lg border-2 transition-colors text-left ${
                  experienceLevel === 'intermediate'
                    ? 'border-primary bg-primary/20'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <p className="font-semibold">Intermediate</p>
                <p className="text-sm text-text-secondary">Some experience with memory training</p>
              </button>

              <button
                onClick={() => setExperienceLevel('advanced')}
                className={`w-full p-6 rounded-lg border-2 transition-colors text-left ${
                  experienceLevel === 'advanced'
                    ? 'border-primary bg-primary/20'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <p className="font-semibold">Advanced</p>
                <p className="text-sm text-text-secondary">Experienced with cognitive exercises</p>
              </button>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setStep(2)} variant="outline" size="lg">
                Back
              </Button>
              <Button onClick={handleComplete} size="lg" className="flex-1">
                Start Training
              </Button>
            </div>
          </div>
        )}
        </Card>
      </div>
      <Footer />
    </div>
  );
}
