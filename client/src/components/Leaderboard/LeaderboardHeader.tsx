import { Trophy } from "lucide-react";

export function LeaderboardHeader() {
  return (
    <div className="text-center space-y-4 mb-8">
      <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full">
        <Trophy className="w-5 h-5 text-primary mr-2" />
        <span className="text-sm font-medium text-primary">
          Global Rankings
        </span>
      </div>
      <h1 className="text-4xl font-bold">
        GeoHunt{" "}
        <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          Leaderboard
        </span>
      </h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Compete with players worldwide and climb the ranks. Can you make it to
        the top?
      </p>
    </div>
  );
}
