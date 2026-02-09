import { useState, useEffect } from 'react';
import type { AppView } from '@/types/expense';
import LoadingScreen from '@/components/expense/LoadingScreen';
import OnboardingFlow from '@/components/expense/OnboardingFlow';
import Dashboard from '@/components/expense/Dashboard';
import ErrorState from '@/components/expense/ErrorState';

const Index = () => {
  const [view, setView] = useState<AppView>('loading');

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      const onboarded = localStorage.getItem('expense_onboarded');
      setView(onboarded ? 'dashboard' : 'onboarding');
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('expense_onboarded', 'true');
    setView('dashboard');
  };

  const handleRetry = () => {
    setView('loading');
    setTimeout(() => setView('dashboard'), 1000);
  };

  switch (view) {
    case 'loading':
      return <LoadingScreen />;
    case 'onboarding':
      return <OnboardingFlow onComplete={handleOnboardingComplete} />;
    case 'error':
      return <ErrorState onRetry={handleRetry} />;
    case 'dashboard':
      return <Dashboard />;
  }
};

export default Index;
