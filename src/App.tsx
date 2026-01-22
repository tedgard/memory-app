import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import MainLayout from '@/components/layout/MainLayout';
import Dashboard from '@/features/dashboard/Dashboard';
import ExercisesPage from '@/features/exercises/ExercisesPage';
import ProgressPage from '@/features/progress/ProgressPage';
import EducationHub from '@/features/education/EducationHub';
import SettingsPage from '@/features/settings/SettingsPage';
import OnboardingFlow from '@/features/onboarding/OnboardingFlow';
import DualNBackGame from '@/features/exercises/dual-nback/DualNBackGame';
import SequenceMemoryGame from '@/features/exercises/sequence-memory/SequenceMemoryGame';
import PatternRecognitionGame from '@/features/exercises/pattern-recognition/PatternRecognitionGame';
import OperationSpanGame from '@/features/exercises/operation-span/OperationSpanGame';
import SpatialMemoryGame from '@/features/exercises/spatial-memory/SpatialMemoryGame';
import AchievementsPage from '@/features/achievements/AchievementsPage';

function App() {
  const profile = useUserStore((state) => state.profile);
  const theme = useSettingsStore((state) => state.theme);
  const onboardingCompleted = profile?.onboardingCompleted ?? false;

  // Apply theme to HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else if (theme === 'dark') {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      // auto mode - check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.remove('light', 'dark');
      root.classList.add(prefersDark ? 'dark' : 'light');
    }
  }, [theme]);

  // Show onboarding for new users
  if (!onboardingCompleted) {
    return (
      <Router>
        <OnboardingFlow />
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="exercises" element={<ExercisesPage />} />
          <Route path="exercises/dual-nback" element={<DualNBackGame />} />
          <Route path="exercises/sequence-memory" element={<SequenceMemoryGame />} />
          <Route path="exercises/pattern-recognition" element={<PatternRecognitionGame />} />
          <Route path="exercises/operation-span" element={<OperationSpanGame />} />
          <Route path="exercises/spatial-memory" element={<SpatialMemoryGame />} />
          <Route path="achievements" element={<AchievementsPage />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="education" element={<EducationHub />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
