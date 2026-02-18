import React, { useEffect, useRef, useState } from "react";
import { fetchPublicStats } from "@/api-clients";
import { Users, Gamepad2, MapPin } from "lucide-react";

interface Stat {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
}

/** Animates a number from 0 to `target` over `duration` ms. */
function useCountUp(target: number, duration = 1800): number {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (target === 0) return;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return count;
}

function StatPill({ icon, label, value }: Stat) {
  const animated = useCountUp(value);
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <span className="text-amber-400">{icon}</span>
      <span className="text-white font-bold text-lg tabular-nums">
        {animated.toLocaleString()}
      </span>
      <span className="text-gray-400 text-sm">{label}</span>
    </div>
  );
}

export default function StatsBar() {
  const [stats, setStats] = useState<{
    totalUsers: number;
    totalGames: number;
    totalGuesses: number;
  } | null>(null);

  useEffect(() => {
    fetchPublicStats()
      .then(setStats)
      .catch(() => {
        // Silently fail — stats bar is non-critical UI
      });
  }, []);

  if (!stats) return null;

  const items: Stat[] = [
    {
      icon: <Users className="w-4 h-4" />,
      label: "players",
      value: stats.totalUsers,
    },
    {
      icon: <Gamepad2 className="w-4 h-4" />,
      label: "games played",
      value: stats.totalGames,
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      label: "guesses made",
      value: stats.totalGuesses,
    },
  ];

  return (
    <div
      className="inline-flex flex-wrap items-center justify-center gap-1 mt-6
        bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl
        divide-x divide-white/10 px-2 py-1"
    >
      {items.map((item) => (
        <StatPill key={item.label} {...item} />
      ))}
    </div>
  );
}
