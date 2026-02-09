import { useState } from 'react';
import { mockWallets, mockTransactions } from '@/data/mockData';
import WalletCard from './WalletCard';
import TransactionItem from './TransactionItem';

const Dashboard = () => {
  const [walletFilter, setWalletFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(5);

  const filtered = walletFilter === 'all'
    ? mockTransactions
    : mockTransactions.filter((t) => t.walletId === walletFilter);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-lg font-bold text-foreground">Expense Tracker</h1>
        <p className="text-xs text-muted-foreground">Track your spending with voice messages</p>
      </div>

      {/* Wallets */}
      <section className="px-5 mb-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Wallets</h2>
        <div className="flex flex-col gap-2">
          {mockWallets.map((w) => (
            <WalletCard key={w.id} wallet={w} />
          ))}
        </div>
      </section>

      {/* Transactions */}
      <section className="px-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Transactions</h2>
          <select
            value={walletFilter}
            onChange={(e) => { setWalletFilter(e.target.value); setVisibleCount(5); }}
            className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-card-foreground outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="all">All Wallets</option>
            {mockWallets.map((w) => (
              <option key={w.id} value={w.id}>{w.name}</option>
            ))}
          </select>
        </div>

        {visible.length === 0 ? (
          <div className="flex flex-col items-center py-12 animate-fade-in">
            <span className="text-4xl mb-3">📭</span>
            <p className="text-sm font-medium text-foreground mb-1">No transactions yet</p>
            <p className="text-xs text-muted-foreground text-center max-w-[240px]">
              Close this page and send a voice message to the bot to create your first transaction!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {visible.map((t, i) => (
              <TransactionItem key={t.id} transaction={t} index={i} />
            ))}
          </div>
        )}

        {hasMore && (
          <button
            onClick={() => setVisibleCount((c) => c + 5)}
            className="mt-4 w-full rounded-xl border border-border bg-card py-3 text-sm font-medium text-primary transition-all hover:bg-primary/5 active:scale-[0.99]"
          >
            Load More
          </button>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
