import { useState, useMemo } from 'react';
import { mockWallets, mockTransactions } from '@/data/mockData';
import { ChevronDown, TrendingUp, TrendingDown, ArrowLeftRight } from 'lucide-react';
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
    if (w.currency === 'EUR') return sum + w.balance * 1.08;
    return sum + w.balance;
  }, 0);
  const totalFormatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalBalance);

  // Quick stats
  const totalIncome = mockTransactions
    .filter((t) => t.type === 'income')
    .reduce((s, t) => s + t.amount, 0);
  const totalExpense = mockTransactions
    .filter((t) => t.type === 'expense')
    .reduce((s, t) => s + Math.abs(t.amount), 0);

  const filtered = selectedWallet
    ? mockTransactions.filter((t) => t.walletId === selectedWallet)
    : mockTransactions;

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const grouped = useMemo(() => groupByDate(visible), [visible]);

  let globalIndex = 0;

  return (
    <div className="min-h-screen bg-background pb-10">
      {/* Hero */}
      <div className="relative overflow-hidden px-5 pt-10 pb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Total Balance
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground tabular-nums">
            ${totalFormatted}
          </h1>

          {/* Quick stat pills */}
          <div className="mt-4 flex gap-2">
            <div className="flex items-center gap-1.5 rounded-full bg-income-light px-3 py-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-income" />
              <span className="text-xs font-semibold text-income">
                +${new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(totalIncome)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-expense-light px-3 py-1.5">
              <TrendingDown className="h-3.5 w-3.5 text-expense" />
              <span className="text-xs font-semibold text-expense">
                -${new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(totalExpense)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet cards */}
      <section className="mb-6">
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
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Transactions
          </h2>
          {selectedWallet && (
            <button
              onClick={() => { setSelectedWallet(null); setVisibleCount(8); }}
              className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition hover:bg-primary/20"
            >
              Clear filter ×
            </button>
          )}
        </div>

        {visible.length === 0 ? (
          <div className="flex flex-col items-center py-16 animate-fade-in">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
              <ArrowLeftRight className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="text-sm font-semibold text-foreground mb-1">No transactions yet</p>
            <p className="text-xs text-muted-foreground text-center max-w-[260px] leading-relaxed">
              Send a voice message to the bot to record your first expense!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {grouped.map((group) => (
              <div key={group.label}>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70">
                  {group.label}
                </p>
                <div className="rounded-2xl bg-card border border-border shadow-sm px-4 divide-y divide-border/60">
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
            className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-2xl border border-border bg-card py-3.5 text-sm font-semibold text-muted-foreground shadow-sm transition-all hover:text-foreground hover:border-primary/30 active:scale-[0.99]"
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
