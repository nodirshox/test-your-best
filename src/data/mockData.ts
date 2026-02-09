import { Wallet, Transaction, Language, Currency } from '@/types/expense';

export const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'uz', name: "O'zbek", flag: '🇺🇿' },
];

export const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
  { code: 'UZS', name: 'Uzbek Som', symbol: 'сўм' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
  { code: 'KZT', name: 'Kazakh Tenge', symbol: '₸' },
  { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴' },
];

export const mockWallets: Wallet[] = [
  { id: '1', name: 'Main Wallet', balance: 2847.5, currency: 'USD', isDefault: true },
  { id: '2', name: 'Savings', balance: 12500.0, currency: 'USD', isDefault: false },
  { id: '3', name: 'Travel', balance: -320.75, currency: 'EUR', isDefault: false },
];

export const mockTransactions: Transaction[] = [
  { id: '1', description: 'Grocery Store', category: '🛒 Groceries', amount: -67.34, currency: 'USD', type: 'expense', date: '2026-02-09', walletId: '1' },
  { id: '2', description: 'Monthly Salary', category: '💰 Salary', amount: 4200.0, currency: 'USD', type: 'income', date: '2026-02-08', walletId: '1' },
  { id: '3', description: 'Uber Ride', category: '🚕 Transport', amount: -18.5, currency: 'USD', type: 'expense', date: '2026-02-08', walletId: '1' },
  { id: '4', description: 'Netflix Subscription', category: '🎬 Entertainment', amount: -15.99, currency: 'USD', type: 'expense', date: '2026-02-07', walletId: '1' },
  { id: '5', description: 'Freelance Payment', category: '💼 Freelance', amount: 850.0, currency: 'USD', type: 'income', date: '2026-02-06', walletId: '2' },
  { id: '6', description: 'Restaurant Dinner', category: '🍽️ Food', amount: -42.0, currency: 'USD', type: 'expense', date: '2026-02-06', walletId: '1' },
  { id: '7', description: 'USD to EUR', category: '💱 Exchange', amount: -500.0, currency: 'USD', type: 'exchange', date: '2026-02-05', walletId: '1' },
  { id: '8', description: 'Flight Tickets', category: '✈️ Travel', amount: -320.75, currency: 'EUR', type: 'expense', date: '2026-02-04', walletId: '3' },
  { id: '9', description: 'Coffee Shop', category: '☕ Coffee', amount: -5.8, currency: 'USD', type: 'expense', date: '2026-02-04', walletId: '1' },
  { id: '10', description: 'Gym Membership', category: '🏋️ Health', amount: -45.0, currency: 'USD', type: 'expense', date: '2026-02-03', walletId: '1' },
];
