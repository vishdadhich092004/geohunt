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
import {
  ClassicSkeleton,
  SpeedSkeleton,
  InfiniteSkeleton,
  HardcoreSkeleton,
  BlitzSkeleton,
} from "./GameModeSkeleton";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { useEffect, useState } from "react";
import { fetchGameModes } from "@/api-clients";
import { GameModeType } from "../../../../server/shared/types";
import BackButton from "@/components/BackButton";
interface GameModesProps {
  setGameModeId: (id: string) => void;
}
export const GameModes = ({ setGameModeId }: GameModesProps) => {
  const [gameModes, setGameModes] = useState<GameModeType[]>([]);

  useEffect(() => {
    const loadGameModes = async () => {
      const modes = await fetchGameModes();
      setGameModes(modes);
    };
    loadGameModes();
  }, []);

  const getSkeletonForMode = (mode: GameModeType) => {
    switch (mode.name) {
      case "Classic":
        return <ClassicSkeleton mode={mode} />;
      case "Speed Run":
      case "Blitz":
        return <BlitzSkeleton mode={mode} />;
      case "Time Attack":
        return <SpeedSkeleton mode={mode} />;
      case "Infinite":
      case "Practice":
        return <InfiniteSkeleton />;
      case "Hardcore":
        return <HardcoreSkeleton />;
      default:
        return <ClassicSkeleton mode={mode} />;
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case "Classic":
        return <Gamepad2 className="h-5 w-5" />;
      case "Precision Master":
        return <Target className="h-5 w-5" />;
      case "Hardcore":
        return <Zap className="h-5 w-5" />;
      case "Speed Run":
        return <Clock className="h-5 w-5" />;
      case "Blitz":
        return <Trophy className="h-5 w-5" />;
      case "Time Attack":
        return <Brain className="h-5 w-5" />;
      case "Daily Challenge":
        return <Calendar className="h-5 w-5" />;
      case "Practice":
        return <Heart className="h-5 w-5" />;
      case "Infinite":
        return <Infinity className="h-5 w-5" />;
      default:
        return <Gamepad2 className="h-5 w-5" />;
    }
  };
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black/70 via-black/50 to-background text-white">
      <BackButton />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Choose Your Game Mode</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Select from our variety of challenging game modes, each offering a
          unique way to test your skills and improve your gameplay.
        </p>
      </motion.div>

      <BentoGrid>
        {gameModes.map((mode) => (
          <BentoGridItem
            onClick={() => setGameModeId(mode.id)}
            key={mode.id}
            title={mode.name}
            description={mode.description}
            header={getSkeletonForMode(mode)}
            icon={getIcon(mode.name)}
            className={
              mode.name === "Classic" || mode.name === "Hardcore"
                ? "md:col-span-2"
                : "md:col-span-1"
            }
          />
        ))}
      </BentoGrid>
    </div>
  );
};
