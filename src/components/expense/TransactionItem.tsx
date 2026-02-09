import type { Transaction } from '@/types/expense';

interface TransactionItemProps {
  transaction: Transaction;
  index: number;
}

const categoryIcon: Record<string, string> = {
  '🛒 Groceries': '🛒',
  '💰 Salary': '💰',
  '🚕 Transport': '🚕',
  '🎬 Entertainment': '🎬',
  '💼 Freelance': '💼',
  '🍽️ Food': '🍽️',
  '💱 Exchange': '💱',
  '✈️ Travel': '✈️',
  '☕ Coffee': '☕',
  '🏋️ Health': '🏋️',
};

const categoryLabel = (cat: string) => cat.replace(/^[^\s]+\s/, '');

const TransactionItem = ({ transaction, index }: TransactionItemProps) => {
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(transaction.amount));
  const symbol = transaction.currency === 'EUR' ? '€' : '$';
  const icon = categoryIcon[transaction.category] || '📦';

  const amountClass =
    transaction.type === 'income'
      ? 'amount-income'
      : transaction.type === 'exchange'
        ? 'amount-exchange'
        : 'text-foreground';

  return (
    <div
      className="flex items-center gap-3 py-3 animate-fade-in"
      style={{ animationDelay: `${index * 30}ms`, animationFillMode: 'backwards' }}
    >
      {/* Category avatar */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-lg">
        {icon}
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
