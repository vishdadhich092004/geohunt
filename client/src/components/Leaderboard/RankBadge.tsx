import { cn } from "@/lib/utils";

interface RankBadgeProps {
  rank: number;
}

export function RankBadge({ rank }: RankBadgeProps) {
  let badgeClass = "bg-muted text-muted-foreground";
  let icon = null;

  if (rank === 1) {
    badgeClass = "bg-yellow-500 text-yellow-950";
    icon = "🥇";
  } else if (rank === 2) {
    badgeClass = "bg-gray-300 text-gray-800";
    icon = "🥈";
  } else if (rank === 3) {
    badgeClass = "bg-amber-600 text-amber-950";
    icon = "🥉";
  }

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm",
        badgeClass
      )}
    >
      {icon || rank}
    </div>
  );
}
