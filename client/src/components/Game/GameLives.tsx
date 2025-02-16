import { Compass } from "lucide-react";

interface GameLivesProps {
  lives: number;
  maxLives?: number;
}

function GameLives({ lives, maxLives = 5 }: GameLivesProps) {
  return (
    <div
      className="flex items-center gap-1 bg-zinc-800/50 backdrop-blur-sm px-1.5 sm:px-2 py-1.5 rounded-xl border border-zinc-700/30 transition-all duration-300 hover:border-zinc-700/50"
      title={`${lives}/${maxLives} lives remaining`}
    >
      {[...Array(maxLives)].map((_, index) => (
        <Compass
          key={index}
          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 transition-all duration-300 ${
            index < lives
              ? "fill-emerald-500/20 text-amber-400"
              : "fill-zinc-800/50 text-zinc-600 opacity-40"
          } ${index < lives && "hover:scale-110 hover:text-emerald-300"}`}
        />
      ))}
    </div>
  );
}

export default GameLives;
