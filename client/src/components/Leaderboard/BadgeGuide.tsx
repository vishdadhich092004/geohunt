import { Trophy } from "lucide-react";

export function BadgeGuide() {
  return (
    <div className="lg:col-span-1">
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h3 className="font-semibold mb-4 text-lg">Badge Guide</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🐴</span>
            <span className="text-sm text-muted-foreground">Early Bird</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">👨‍💻</span>
            <span className="text-sm text-muted-foreground">Dev's Team</span>
          </div>
          <div className="h-px bg-border my-2" />

          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-cyan-500" />
            <span className="text-sm text-muted-foreground">
              On Drugs (1M+ points)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-orange-500" />
            <span className="text-sm text-muted-foreground">
              Badass (800k+ points)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-red-500" />
            <span className="text-sm text-muted-foreground">
              Legend (600k+ points)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-emerald-500" />
            <span className="text-sm text-muted-foreground">
              Elite (400k+ points)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-purple-500" />
            <span className="text-sm text-muted-foreground">
              Grandmaster (200k+ points)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="text-sm text-muted-foreground">
              Master (100k+ points)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-muted-foreground">
              Newbie (0+ points)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BadgeGuide;
