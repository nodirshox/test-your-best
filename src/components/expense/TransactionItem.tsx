import type { Transaction } from '@/types/expense';

interface TransactionItemProps {
  transaction: Transaction;
  index: number;
}

const categoryConfig: Record<string, { icon: string; bg: string }> = {
  '🛒 Groceries': { icon: '🛒', bg: 'bg-green-50 dark:bg-green-950/30' },
  '💰 Salary': { icon: '💰', bg: 'bg-amber-50 dark:bg-amber-950/30' },
  '🚕 Transport': { icon: '🚕', bg: 'bg-yellow-50 dark:bg-yellow-950/30' },
  '🎬 Entertainment': { icon: '🎬', bg: 'bg-purple-50 dark:bg-purple-950/30' },
  '💼 Freelance': { icon: '💼', bg: 'bg-blue-50 dark:bg-blue-950/30' },
  '🍽️ Food': { icon: '🍽️', bg: 'bg-orange-50 dark:bg-orange-950/30' },
  '💱 Exchange': { icon: '💱', bg: 'bg-cyan-50 dark:bg-cyan-950/30' },
  '✈️ Travel': { icon: '✈️', bg: 'bg-sky-50 dark:bg-sky-950/30' },
  '☕ Coffee': { icon: '☕', bg: 'bg-amber-50 dark:bg-amber-950/30' },
  '🏋️ Health': { icon: '🏋️', bg: 'bg-rose-50 dark:bg-rose-950/30' },
};

const categoryLabel = (cat: string) => cat.replace(/^[^\s]+\s/, '');

const TransactionItem = ({ transaction, index }: TransactionItemProps) => {
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(transaction.amount));
  const symbol = transaction.currency === 'EUR' ? '€' : '$';
  const config = categoryConfig[transaction.category] || { icon: '📦', bg: 'bg-muted' };

  const amountClass =
    transaction.type === 'income'
      ? 'text-income'
      : transaction.type === 'exchange'
        ? 'text-exchange'
        : 'text-foreground';

  return (
    <div
      className="flex items-center gap-3 py-3.5 animate-fade-in"
      style={{ animationDelay: `${index * 30}ms`, animationFillMode: 'backwards' }}
    >
      {/* Category avatar */}
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${config.bg}`}>
        {config.icon}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{transaction.description}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{categoryLabel(transaction.category)}</p>
      </div>

      {/* Amount */}
      <div className="shrink-0 text-right">
        <p className={`text-sm font-bold tabular-nums ${amountClass}`}>
          {transaction.amount > 0 ? '+' : '-'}{symbol}{formatted}
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;
