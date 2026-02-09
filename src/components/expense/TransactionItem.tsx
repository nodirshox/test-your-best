import type { Transaction } from '@/types/expense';

interface TransactionItemProps {
  transaction: Transaction;
  index: number;
}

const badgeStyles: Record<string, string> = {
  expense: 'bg-expense-light text-expense',
  income: 'bg-income-light text-income',
  exchange: 'bg-exchange-light text-exchange',
};

const TransactionItem = ({ transaction, index }: TransactionItemProps) => {
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(transaction.amount));

  const dateStr = new Date(transaction.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      className="flex items-start justify-between gap-3 rounded-xl bg-card px-4 py-3 animate-fade-in"
      style={{ animationDelay: `${index * 40}ms`, animationFillMode: 'backwards' }}
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-card-foreground">{transaction.description}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {transaction.category} · {dateStr}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className={`text-sm font-bold tabular-nums ${
          transaction.type === 'income' ? 'amount-income' : transaction.type === 'exchange' ? 'amount-exchange' : 'amount-expense'
        }`}>
          {transaction.amount > 0 ? '+' : '-'}{transaction.currency === 'EUR' ? '€' : '$'}{formatted}
        </span>
        <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${badgeStyles[transaction.type]}`}>
          {transaction.type}
        </span>
      </div>
    </div>
  );
};

export default TransactionItem;
