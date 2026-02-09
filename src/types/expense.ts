export type TransactionType = 'expense' | 'income' | 'exchange';

export interface Wallet {
  id: string;
  name: string;
  balance: number;
  currency: string;
  isDefault: boolean;
}

export interface Transaction {
  id: string;
  description: string;
  category: string;
  amount: number;
  currency: string;
  type: TransactionType;
  date: string;
  walletId: string;
}

export type AppView = 'loading' | 'onboarding' | 'dashboard' | 'error';
export type OnboardingStep = 1 | 2 | 3;

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}
