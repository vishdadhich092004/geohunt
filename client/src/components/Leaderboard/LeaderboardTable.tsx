import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RankBadge } from "./RankBadge";
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Trophy } from "lucide-react";

interface LeaderboardEntry {
  id: string;
  username: string;
  totalScore: number;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
  return (
    <Card className="overflow-hidden border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-24">Rank</TableHead>
            <TableHead>Player</TableHead>
            <TableHead className="text-right">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry, index) => (
            <TableRow
              key={entry.id}
              className={cn(
                "group transition-colors hover:bg-muted/50",
                index < 3 && "bg-muted/20"
              )}
            >
              <TableCell className="font-medium">
                <RankBadge rank={index + 1} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-semibold group-hover:text-primary transition-colors">
                    {entry.username}
                  </span>
                  {entry.totalScore >= 100000 && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full text-xs font-medium hover:bg-yellow-500/20 transition-colors cursor-help">
                            <Trophy className="h-3 w-3" />
                            Master
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>First player to reach 100,000 points</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right font-mono text-muted-foreground">
                {entry.totalScore.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
