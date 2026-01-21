import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import MainLayout from '@/components/layout/MainLayout';
import Dashboard from '@/features/dashboard/Dashboard';
import ExercisesPage from '@/features/exercises/ExercisesPage';
import ProgressPage from '@/features/progress/ProgressPage';
import EducationHub from '@/features/education/EducationHub';
import SettingsPage from '@/features/settings/SettingsPage';
import OnboardingFlow from '@/features/onboarding/OnboardingFlow';
import DualNBackGame from '@/features/exercises/dual-nback/DualNBackGame';

function App() {
  const profile = useUserStore((state) => state.profile);
  const onboardingCompleted = profile?.onboardingCompleted ?? false;

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
