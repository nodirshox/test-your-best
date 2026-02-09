import { useState, useMemo } from 'react';
import { mockWallets, mockTransactions } from '@/data/mockData';
import { ChevronDown } from 'lucide-react';
import WalletCard from './WalletCard';
import TransactionItem from './TransactionItem';

/** Group transactions by date label */
const groupByDate = (txs: typeof mockTransactions) => {
  const groups: { label: string; items: typeof mockTransactions }[] = [];
  const map = new Map<string, typeof mockTransactions>();

  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  for (const t of txs) {
    let label: string;
    if (t.date === today) label = 'Today';
    else if (t.date === yesterday) label = 'Yesterday';
    else label = new Date(t.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    if (!map.has(label)) {
      map.set(label, []);
    }
    map.get(label)!.push(t);
  }

  map.forEach((items, label) => groups.push({ label, items }));
  return groups;
};

const Dashboard = () => {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);

  // Total balance
  const totalBalance = mockWallets.reduce((sum, w) => {
    if (w.currency === 'EUR') return sum + w.balance * 1.08; // rough conversion
    return sum + w.balance;
  }, 0);
  const totalFormatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalBalance);

  const filtered = selectedWallet
    ? mockTransactions.filter((t) => t.walletId === selectedWallet)
    : mockTransactions;

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const grouped = useMemo(() => groupByDate(visible), [visible]);

  let globalIndex = 0;

  return (
    <div className="min-h-screen bg-background pb-10">
      {/* Hero / Total Balance */}
      <div className="px-5 pt-8 pb-2">
        <p className="text-xs font-medium text-muted-foreground mb-1">Total Balance</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground tabular-nums">
          ${totalFormatted}
        </h1>
      </div>

      {/* Wallet cards — horizontal scroll */}
      <section className="mt-4 mb-6">
        <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-none">
          {mockWallets.map((w) => (
            <WalletCard
              key={w.id}
              wallet={w}
              isSelected={selectedWallet === w.id}
              onSelect={(id) => {
                setSelectedWallet((prev) => (prev === id ? null : id));
                setVisibleCount(8);
              }}
            />
          ))}
        </div>
      </section>

      {/* Transactions */}
      <section className="px-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground">Transactions</h2>
          {selectedWallet && (
            <button
              onClick={() => { setSelectedWallet(null); setVisibleCount(8); }}
              className="flex items-center gap-1 rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground transition hover:text-foreground"
            >
              Clear filter ×
            </button>
          )}
        </div>

        {visible.length === 0 ? (
          <div className="flex flex-col items-center py-16 animate-fade-in">
            <span className="text-5xl mb-4">📭</span>
            <p className="text-sm font-semibold text-foreground mb-1">No transactions yet</p>
            <p className="text-xs text-muted-foreground text-center max-w-[260px] leading-relaxed">
              Send a voice message to the bot to record your first expense!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {grouped.map((group) => (
              <div key={group.label}>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {group.label}
                </p>
                <div className="rounded-2xl bg-card border border-border px-4 divide-y divide-border">
                  {group.items.map((t) => {
                    const idx = globalIndex++;
                    return <TransactionItem key={t.id} transaction={t} index={idx} />;
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {hasMore && (
          <button
            onClick={() => setVisibleCount((c) => c + 8)}
            className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-2xl bg-muted py-3.5 text-sm font-semibold text-muted-foreground transition-all hover:text-foreground active:scale-[0.99]"
          >
            Load More
            <ChevronDown className="h-4 w-4" />
          </button>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
