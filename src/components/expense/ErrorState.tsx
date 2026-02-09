interface ErrorStateProps {
  onRetry: () => void;
}

const ErrorState = ({ onRetry }: ErrorStateProps) => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 animate-fade-in">
    <span className="mb-4 text-5xl">😔</span>
    <h2 className="mb-2 text-lg font-semibold text-foreground">Something went wrong</h2>
    <p className="mb-6 text-center text-sm text-muted-foreground max-w-[260px]">
      We couldn't load your data. Please check your connection and try again.
    </p>
    <button
      onClick={onRetry}
      className="rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.97]"
    >
      Try Again
    </button>
  </div>
);

export default ErrorState;
