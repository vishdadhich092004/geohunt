import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Heart,
  Infinity,
  Zap,
  Target,
  Brain,
  Calendar,
  Gamepad2,
  Trophy,
} from "lucide-react";
import { GameModeType } from "../../../../server/shared/types";

const getIcon = (name: string) => {
  switch (name) {
    case "Classic":
      return <Gamepad2 className="w-6 h-6" />;
    case "Precision Master":
      return <Target className="w-6 h-6" />;
    case "Hardcore":
      return <Zap className="w-6 h-6" />;
    case "Speed Run":
      return <Clock className="w-6 h-6" />;
    case "Blitz":
      return <Trophy className="w-6 h-6" />;
    case "Time Attack":
      return <Brain className="w-6 h-6" />;
    case "Daily Challenge":
      return <Calendar className="w-6 h-6" />;
    case "Practice":
      return <Heart className="w-6 h-6" />;
    case "Infinite":
      return <Infinity className="w-6 h-6" />;
    default:
      return <Gamepad2 className="w-6 h-6" />;
  }
};

interface GameModeCardProps {
  mode: GameModeType;
  index: number;
}

export const GameModeCard: React.FC<GameModeCardProps> = ({ mode, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="bg-black/30 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:bg-black/40 text-white"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-lg bg-primary/20 text-primary">
          {getIcon(mode.name)}
        </div>
        <h3 className="text-xl font-bold">{mode.name}</h3>
      </div>

      <p className="mb-4">{mode.description}</p>

      <div className="flex gap-4 text-sm">
        {mode.maxLives !== null && (
          <div className="flex items-center gap-1 text-rose-400">
            <Heart className="w-4 h-4" />
            <span>{mode.maxLives}</span>
          </div>
        )}
        {mode.timeLimit !== null && (
          <div className="flex items-center gap-1 text-amber-400">
            <Clock className="w-4 h-4" />
            <span>
              {Math.floor(mode.timeLimit / 60)}m {mode.timeLimit % 60}s
            </span>
          </div>
        )}
        <div className="flex items-center gap-1 text-gray-400 text-xs ml-auto">
          Added {new Date(mode.createdAt).toLocaleDateString()}
        </div>
      </div>
    </motion.div>
  );
};
