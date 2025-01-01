import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RankBadge } from "./RankBadge";
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";

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
              <TableCell className="font-semibold group-hover:text-primary transition-colors">
                {entry.username}
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
