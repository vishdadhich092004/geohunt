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
}

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Show button when scrolled down 200px
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

  return (
    <>
      <Card className="overflow-hidden border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-24">Rank</TableHead>
              <TableHead>Player/Team</TableHead>
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
                    <Link
                      to={`/analytics/${entry.id}`}
                      className="font-semibold group-hover:text-primary transition-colors"
                    >
                      {entry.username}
                    </Link>
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

      {/* Scroll to top button */}
      {showScrollButton && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 rounded-full shadow-lg bg-background/80 backdrop-blur-sm"
          onClick={scrollToTop}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}
