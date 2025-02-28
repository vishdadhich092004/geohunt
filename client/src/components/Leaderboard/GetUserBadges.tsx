import { LeaderboardEntry } from "./LeaderboardTable";
import { Trophy } from "lucide-react";
interface Badge {
  icon?: React.ReactNode;
  label: string;
  tooltip: string;
  bgColor: string;
  textColor: string;
}

export const getUserBadges = (entry: LeaderboardEntry): Badge[] => {
  const badges: Badge[] = [];

  if (new Date(entry.createdAt) < new Date("2025-01-01")) {
    badges.push({
      label: "🐴",
      tooltip: "Early Bird",
      bgColor: "bg-amber-500/10 hover:bg-amber-500/20",
      textColor: "text-amber-500",
    });
  }
  // Dev badge
  if (entry.username === "vish") {
    badges.push({
      label: "👨‍💻",
      tooltip: "Dev's Team",
      bgColor: "bg-blue-500/10 hover:bg-blue-500/20",
      textColor: "text-blue-500",
    });
  }

  // Score-based badges
  if (entry.totalScore >= 1000000) {
    badges.push({
      label: "🏆",
      tooltip: "On Drugs",
      bgColor: "bg-cyan-500/10 hover:bg-cyan-500/20",
      textColor: "text-cyan-500",
    });
  } else if (entry.totalScore >= 800000) {
    badges.push({
      label: "🏆",
      tooltip: "Badass",
      bgColor: "bg-orange-500/10 hover:bg-orange-500/20",
      textColor: "text-orange-500",
    });
  } else if (entry.totalScore >= 600000) {
    badges.push({
      icon: <Trophy className="h-3 w-3" />,
      label: "Legend",
      tooltip: "Crossed 600,000 points",
      bgColor: "bg-red-500/10 hover:bg-red-500/20",
      textColor: "text-red-500",
    });
  } else if (entry.totalScore >= 400000) {
    badges.push({
      icon: <Trophy className="h-3 w-3" />,
      label: "Elite",
      tooltip: "Crossed 400,000 points",
      bgColor: "bg-emerald-500/10 hover:bg-emerald-500/20",
      textColor: "text-emerald-500",
    });
  } else if (entry.totalScore >= 200000) {
    badges.push({
      icon: <Trophy className="h-3 w-3" />,
      label: "Grandmaster",
      tooltip: "Crossed 200,000 points",
      bgColor: "bg-purple-500/10 hover:bg-purple-500/20",
      textColor: "text-purple-500",
    });
  } else if (entry.totalScore >= 100000) {
    badges.push({
      icon: <Trophy className="h-3 w-3" />,
      label: "Master",
      tooltip: "Crossed 100,000 points",
      bgColor: "bg-yellow-500/10 hover:bg-yellow-500/20",
      textColor: "text-yellow-500",
    });
  } else {
    badges.push({
      label: "👶",
      tooltip: "Newbie",
      bgColor: "bg-gray-500/10 hover:bg-gray-500/20",
      textColor: "text-gray-500",
    });
  }

  return badges;
};
