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
      className={`group relative flex min-w-[170px] shrink-0 flex-col gap-3 rounded-2xl p-4 transition-all duration-200 active:scale-[0.97] ${
        isSelected
          ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20'
          : 'bg-card text-card-foreground border border-border shadow-sm hover:shadow-md hover:border-primary/20'
      }`}
    >
      {/* Icon row */}
      <div className="flex items-center justify-between">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${
          isSelected ? 'bg-primary-foreground/15' : 'bg-primary/8'
        }`}>
          <WalletIcon className={`h-4 w-4 ${isSelected ? '' : 'text-primary'}`} />
        </div>
        {wallet.isDefault && (
          <Star className={`h-3.5 w-3.5 ${isSelected ? 'fill-primary-foreground/50 text-primary-foreground/50' : 'fill-exchange text-exchange'}`} />
        )}
      </div>

      {/* Name */}
      <span className={`text-xs font-semibold truncate ${isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
        {wallet.name}
      </span>

      {/* Balance */}
      <span className={`text-lg font-extrabold tabular-nums tracking-tight ${
        isSelected
          ? 'text-primary-foreground'
          : isNegative ? 'text-expense' : 'text-foreground'
      }`}>
        {isNegative ? '-' : ''}{symbol}{formatted}
      </span>
    </button>
  );
};

export default WalletCard;
