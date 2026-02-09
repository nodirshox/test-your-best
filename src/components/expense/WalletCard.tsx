import type { Wallet } from '@/types/expense';
import { Wallet as WalletIcon, Star } from 'lucide-react';

interface WalletCardProps {
  wallet: Wallet;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const WalletCard = ({ wallet, isSelected, onSelect }: WalletCardProps) => {
  const isNegative = wallet.balance < 0;
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(wallet.balance));
  const symbol = wallet.currency === 'EUR' ? '€' : '$';

  return (
    <button
      onClick={() => onSelect(wallet.id)}
      className={`group relative flex min-w-[160px] shrink-0 flex-col gap-3 rounded-2xl p-4 transition-all duration-200 active:scale-[0.97] ${
        isSelected
          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
          : 'bg-card text-card-foreground border border-border hover:border-primary/30'
      }`}
    >
      {/* Icon row */}
      <div className="flex items-center justify-between">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
          isSelected ? 'bg-primary-foreground/20' : 'bg-muted'
        }`}>
          <WalletIcon className="h-4 w-4" />
        </div>
        {wallet.isDefault && (
          <Star className={`h-3.5 w-3.5 ${isSelected ? 'fill-primary-foreground/60 text-primary-foreground/60' : 'fill-exchange text-exchange'}`} />
        )}
      </div>

      {/* Name */}
      <span className={`text-xs font-medium truncate ${isSelected ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
        {wallet.name}
      </span>

      {/* Balance */}
      <span className={`text-lg font-bold tabular-nums tracking-tight ${
        isSelected
          ? 'text-primary-foreground'
          : isNegative ? 'amount-expense' : 'text-card-foreground'
      }`}>
        {isNegative ? '-' : ''}{symbol}{formatted}
      </span>
    </button>
  );
};

export default WalletCard;
