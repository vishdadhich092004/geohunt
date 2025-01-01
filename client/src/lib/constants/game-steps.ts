import { MapPin, Search, Target, Trophy, Map } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface GameStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const gameSteps: GameStep[] = [
  {
    icon: MapPin,
    title: "Start Your Journey",
    description:
      "You'll be dropped into a random location somewhere in the world using Street View.",
  },
  {
    icon: Search,
    title: "Explore & Observe",
    description:
      "Look around for clues like road signs, architecture, vegetation, and driving side to determine your location.",
  },
  {
    icon: Map,
    title: "Make Your Guess",
    description:
      "Open the world map and place your marker where you think you are. The closer your guess, the more points you earn.",
  },
  {
    icon: Target,
    title: "See Results",
    description:
      "After submitting your guess, see the actual location and how far off you were. Learn from each round!",
  },
  {
    icon: Trophy,
    title: "Compete & Improve",
    description:
      "Play multiple rounds, compete on the global leaderboard, and improve your geography skills.",
  },
];
