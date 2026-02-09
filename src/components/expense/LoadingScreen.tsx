const LoadingScreen = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4 animate-fade-in">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-[3px] border-muted" />
        <div className="absolute inset-0 rounded-full border-[3px] border-primary border-t-transparent animate-spin" />
      </div>
      <p className="text-sm text-muted-foreground animate-pulse-soft">Loading...</p>
    </div>
  </div>
);

export default LoadingScreen;
