import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { Compass } from "lucide-react";
import { GameModeType } from "../../../../server/shared/types";
function GameModeExplanationAlert({
  setShowGameModeExplanation,
  gameMode,
}: {
  setShowGameModeExplanation: (show: boolean) => void;
  gameMode: GameModeType;
}) {
  const getGameModeDetails = () => {
    const livesText = gameMode.maxLives
      ? `You start with ${gameMode.maxLives} ${
          gameMode.maxLives === 1 ? "life" : "lives"
        }`
      : "You have unlimited lives";

    const locationsText = gameMode.maxLocations
      ? `Complete ${gameMode.maxLocations} locations`
      : "Keep playing until you run out of lives";

    const timeText = gameMode.timeLimit
      ? `You have ${gameMode.timeLimit} seconds`
      : "No time limit";

    return {
      livesText,
      locationsText,
      timeText,
    };
  };

  const { livesText, locationsText, timeText } = getGameModeDetails();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <Alert className="relative mx-auto max-w-md bg-zinc-900/95 border-zinc-800/50 backdrop-blur-md rounded-2xl shadow-2xl transition-all duration-300 hover:border-zinc-700/50">
        <AlertTitle className="text-amber-400 text-xl font-semibold mb-4 flex items-center gap-2">
          <div className="bg-zinc-800/50 p-2 rounded-xl border border-zinc-700/30">
            <Compass className="h-6 w-6 fill-emerald-500/20" />
          </div>
          Welcome to {gameMode.name}!
        </AlertTitle>
        <AlertDescription className="space-y-4">
          <div className="text-zinc-200 leading-relaxed">
            {gameMode.description}
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 bg-zinc-800/30 p-2.5 rounded-xl border border-emerald-500/20">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-emerald-400">{livesText}</span>
            </div>
            <div className="flex items-center gap-3 bg-zinc-800/30 p-2.5 rounded-xl border border-amber-500/20">
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              </div>
              <span className="text-amber-400">{timeText}</span>
            </div>
            <div className="flex items-center gap-3 bg-zinc-800/30 p-2.5 rounded-xl border border-red-500/20">
              <div className="h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              </div>
              <span className="text-red-400">{locationsText}</span>
            </div>
          </div>
        </AlertDescription>
        <button
          onClick={() => setShowGameModeExplanation(false)}
          className="mt-5 w-full px-4 py-2.5 bg-zinc-800/50 text-amber-400 
                     rounded-xl border border-zinc-700/30 transition-all duration-300 
                     hover:border-zinc-700/50 hover:bg-zinc-800/80 font-medium"
        >
          Got it!
        </button>
      </Alert>
    </div>
  );
}

export default GameModeExplanationAlert;
