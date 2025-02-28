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
import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserBadges } from "./GetUserBadges";
export interface LeaderboardEntry {
  id: string;
  username: string;
  totalScore: number;
  createdAt: Date;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  currentPage: number;
  limit: number;
}

export function LeaderboardTable({
  entries,
  currentPage,
  limit,
}: LeaderboardTableProps) {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getEntryRank = (index: number) => {
    return (currentPage - 1) * limit + index + 1;
  };

  return (
    <>
      <Card className="overflow-hidden border shadow-lg transition-all duration-300 hover:shadow-primary/10">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-24 font-bold text-primary/80">
                Rank
              </TableHead>
              <TableHead className="font-bold text-primary/80">
                Player/Team
              </TableHead>
              <TableHead className="text-right font-bold text-primary/80">
                Score
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow
                key={entry.id}
                className={cn(
                  "group transition-all duration-300 hover:bg-muted/50",
                  getEntryRank(index) <= 3 && "bg-primary/5"
                )}
              >
                <TableCell className="font-medium">
                  <RankBadge rank={getEntryRank(index)} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/analytics/${entry.id}`}
                      className="font-semibold group-hover:text-primary transition-colors"
                    >
                      {entry.username}
                    </Link>
                    {getUserBadges(entry).map((badge, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger>
                            <div
                              className={cn(
                                "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-colors cursor-help",
                                badge.bgColor,
                                badge.textColor
                              )}
                            >
                              {badge.icon}
                              {badge.label}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{badge.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
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

      {showScrollButton && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 rounded-full shadow-lg bg-background/80 backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-all duration-300 animate-fade-in"
          onClick={scrollToTop}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}
