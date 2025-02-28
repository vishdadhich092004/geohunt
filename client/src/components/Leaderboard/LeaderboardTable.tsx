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
import { Trophy, Users, ArrowUp } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface LeaderboardEntry {
  id: string;
  username: string;
  totalScore: number;
  isTeam?: boolean;
  memberCount?: number;
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
                    {entry.username === "vish" && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center gap-1 bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full text-xs font-medium hover:bg-blue-500/20 transition-colors cursor-help">
                              👨‍💻
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Dev's Team</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    {entry.isTeam && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium hover:bg-primary/20 transition-colors cursor-help">
                              <Users className="h-3 w-3" />
                              {entry.memberCount || 2}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Team with {entry.memberCount} members</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    {entry.totalScore >= 100000 &&
                      entry.totalScore < 200000 && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full text-xs font-medium hover:bg-yellow-500/20 transition-colors cursor-help">
                                <Trophy className="h-3 w-3" />
                                Master
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Crossed 100,000 points</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    {entry.totalScore >= 200000 && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center gap-1 bg-purple-500/10 text-purple-500 px-2 py-0.5 rounded-full text-xs font-medium hover:bg-purple-500/20 transition-colors cursor-help">
                              <Trophy className="h-3 w-3" />
                              Grandmaster
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Crossed 200,000 points</p>
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
