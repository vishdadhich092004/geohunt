import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Home, RotateCcw, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import ShareScoreButton from "./ShareScoreButton";

interface LocationsOverProps {
  score: number;
  onPlayAgain?: () => void;
}

function LocationsOver({ score, onPlayAgain }: LocationsOverProps) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-zinc-900/90 border border-zinc-800/50 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header with gradient border */}
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          <div className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-emerald-500/20 rounded-full blur-lg" />
                <MapPin className="w-12 h-12 text-emerald-500 animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Locations Complete!
            </h2>
            <p className="text-zinc-400 text-sm">
              You've explored all locations
            </p>
          </div>
        </div>

        {/* Score Display */}
        <div className="px-6 py-4">
          <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span className="text-zinc-400 font-medium">Final Score</span>
            </div>
            <div className="text-center">
              <span className="text-4xl font-bold text-white">
                {score.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 pt-4 space-y-3">
          <ShareScoreButton score={score} />
          {onPlayAgain && (
            <Button
              onClick={onPlayAgain}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
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
        </div>
      </motion.div>
    </div>
  );
}

export default LocationsOver;
