import { Trophy } from "lucide-react";

interface GameScoreProps {
  score: number;
}

export function GameScore({ score }: GameScoreProps) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 bg-zinc-800/50 backdrop-blur-sm px-2 sm:px-3 py-1.5 rounded-xl border border-zinc-700/30 transition-all duration-300 hover:border-zinc-700/50 group">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300" />
        <Trophy className="relative h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-amber-400 transform group-hover:scale-110 group-hover:text-amber-300 transition-all duration-300" />
      </div>
      <div className="flex flex-col">
        <span className="text-[8px] sm:text-[10px] md:text-xs text-zinc-400 font-medium tracking-wider">
          SCORE
        </span>
        <span className="font-bold text-xs sm:text-sm md:text-base text-zinc-100 -mt-0.5">
          {score.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default GameScore;
