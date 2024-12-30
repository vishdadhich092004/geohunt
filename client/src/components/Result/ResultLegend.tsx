interface ResultLegendProps {
  distance: number;
  score: number;
}

export function ResultLegend({ distance, score }: ResultLegendProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-secondary/50 rounded-lg">
      <div className="flex items-center justify-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <span className="text-sm text-muted-foreground">Actual Location</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-destructive"></div>
          <span className="text-sm text-muted-foreground">Your Guess</span>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Distance</p>
          <p className="text-xl font-bold text-primary">
            {(distance / 1000).toFixed(2)} km
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Score</p>
          <p className="text-xl font-bold text-primary">{score}</p>
        </div>
      </div>
    </div>
  );
}
