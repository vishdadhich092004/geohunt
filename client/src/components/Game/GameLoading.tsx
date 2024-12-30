export function GameLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="space-y-4 text-center animate-fade-in">
        <div className="inline-flex h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-lg text-muted-foreground">
          Loading your adventure...
        </p>
      </div>
    </div>
  );
}
