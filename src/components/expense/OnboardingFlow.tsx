import { useState } from 'react';
import { languages, currencies } from '@/data/mockData';
import type { OnboardingStep } from '@/types/expense';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState<OnboardingStep>(1);
  const [selectedLang, setSelectedLang] = useState<string | null>(null);

  const handleLanguageSelect = (code: string) => {
    setSelectedLang(code);
    setTimeout(() => setStep(2), 200);
  };

  const handleCurrencySelect = () => {
    setStep(3);
    setTimeout(onComplete, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      {/* Progress dots */}
      <div className="mb-10 flex gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 rounded-full transition-all duration-300 ${
              s === step ? 'w-8 bg-primary' : s < step ? 'w-2 bg-primary/40' : 'w-2 bg-muted'
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="w-full max-w-sm animate-fade-in">
          <div className="mb-2 text-center text-4xl">🌍</div>
          <h2 className="mb-2 text-center text-xl font-semibold text-foreground">Choose your language</h2>
          <p className="mb-8 text-center text-sm text-muted-foreground">Select preferred language for the app</p>
          <div className="flex flex-col gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all active:scale-[0.98] ${
                  selectedLang === lang.code
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border bg-card hover:border-primary/30'
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="font-medium text-card-foreground">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="w-full max-w-sm animate-fade-in">
          <div className="mb-2 text-center text-4xl">💰</div>
          <h2 className="mb-2 text-center text-xl font-semibold text-foreground">Select currency</h2>
          <p className="mb-8 text-center text-sm text-muted-foreground">Choose your default currency</p>
          <div className="grid grid-cols-2 gap-3">
            {currencies.map((cur) => (
              <button
                key={cur.code}
                onClick={handleCurrencySelect}
                className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card px-4 py-4 transition-all hover:border-primary/30 active:scale-[0.97]"
              >
                <span className="text-lg font-semibold text-foreground">{cur.symbol}</span>
                <span className="text-xs text-muted-foreground">{cur.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border-[3px] border-muted" />
            <div className="absolute inset-0 rounded-full border-[3px] border-primary border-t-transparent animate-spin" />
          </div>
          <p className="text-sm font-medium text-foreground">Setting up your account...</p>
          <p className="text-xs text-muted-foreground">This will only take a moment</p>
        </div>
      )}
    </div>
  );
};

export default OnboardingFlow;
