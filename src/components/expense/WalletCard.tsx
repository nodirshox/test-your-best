import type { Wallet } from '@/types/expense';

interface WalletCardProps {
  wallet: Wallet;
}

const WalletCard = ({ wallet }: WalletCardProps) => {
  const isNegative = wallet.balance < 0;
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(wallet.balance));

  return (
    <div
      className={`rounded-2xl border px-4 py-3 transition-all ${
        wallet.isDefault
          ? 'border-primary/20 bg-primary/[0.04] shadow-sm'
          : 'border-border bg-card'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <span className="truncate text-sm font-medium text-card-foreground">{wallet.name}</span>
          {wallet.isDefault && (
            <span className="shrink-0 rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
              Default
            </span>
          )}
        </div>
        <span className={`shrink-0 text-sm font-bold tabular-nums ${isNegative ? 'amount-expense' : 'amount-income'}`}>
          {isNegative ? '-' : ''}{wallet.currency === 'EUR' ? '€' : '$'}{formatted}
        </span>
      </div>
    </div>
  );
};

export default WalletCard;
