import { cn } from "@/lib/utils";
import { Medal } from "lucide-react";

interface RankBadgeProps {
  rank: number;
  className?: string;
}

export function RankBadge({ rank, className }: RankBadgeProps) {
  if (rank > 3)
    return (
      <span className={cn("text-muted-foreground", className)}>{rank}</span>
    );

  return (
    <div className="flex items-center gap-2">
      <Medal
        className={cn("h-5 w-5", {
          "text-yellow-500": rank === 1,
          "text-gray-400": rank === 2,
          "text-amber-600": rank === 3,
        })}
      />
      <span className="font-semibold">{rank}</span>
    </div>
  );
}
