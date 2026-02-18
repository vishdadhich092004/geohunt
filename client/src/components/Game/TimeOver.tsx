import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Timer, Home, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo } from "react";
import ShareScoreButton from "./ShareScoreButton";


interface TimeOverProps {
  score: number;
  onPlayAgain?: () => void;
  gameModeName?: string;
}

const timeOverQuotes = [
  "Time waits for no one, especially in this game!",
  "Tick tock... Your adventure has come to an end.",
  "Time's up! But your journey doesn't end here.",
  "The clock struck zero, but your score lives on!",
  "Sometimes the best moments are time-bound.",
  "Time flies when you're having fun!",
  "The sands of time have run their course.",
];

function TimeOver({ score, onPlayAgain, gameModeName }: TimeOverProps) {
  const navigate = useNavigate();

  const randomQuote = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * timeOverQuotes.length);
    return timeOverQuotes[randomIndex];
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="w-full max-w-md bg-zinc-900/90 border border-zinc-800/50 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header with gradient border */}
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          <div className="p-6 text-center">
            <motion.div
              className="flex justify-center mb-3"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-amber-500/20 rounded-full blur-lg" />
                <Timer className="w-12 h-12 text-amber-500 animate-pulse" />
              </div>
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white mb-3"
            >
              Time's Up!
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-zinc-400 text-sm italic px-4"
            >
              "{randomQuote}"
            </motion.p>
          </div>
        </div>

        {/* Score Display */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="px-6 py-4"
        >
          <div className="bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 rounded-xl p-4 border border-zinc-700/50">
            <div className="text-center space-y-2">
              <span className="text-zinc-400 font-medium">Final Score</span>
              <div className="text-5xl font-bold bg-gradient-to-r from-amber-200 to-amber-400 text-transparent bg-clip-text">
                {score.toLocaleString()}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="p-6 pt-4 space-y-3"
        >
          <ShareScoreButton score={score} gameModeName={gameModeName} />
          {onPlayAgain && (
            <Button
              onClick={onPlayAgain}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="w-full border-zinc-800 hover:bg-zinc-800/50 text-zinc-400 hover:text-white transition-all duration-300"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default TimeOver;
