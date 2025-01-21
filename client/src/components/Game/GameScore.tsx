import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface GameScoreProps {
  score: number;
}

export function GameScore({ score }: GameScoreProps) {
  return (
    <Card className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 shadow-lg hover:bg-zinc-700/50 transition-all duration-300">
      <div className="px-5 py-2 flex items-center gap-4">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/50 to-yellow-300/50 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition duration-200" />
          <Trophy className="h-6 w-6 text-amber-400 relative transform hover:scale-110 transition-transform duration-200" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-zinc-300 font-medium tracking-wide">
            SCORE
          </span>
          <span className="font-bold text-xl text-white">
            {score.toLocaleString()}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default GameScore;
