import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Trophy,
  MapPin,
  Gamepad2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Target,
  Crosshair,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { fetchGameHistory } from "@/api-clients";
import BackButton from "@/components/BackButton";

type GameHistoryEntry = {
  id: string;
  score: number;
  continent: string | null;
  country: string | null;
  startedAt: string;
  finishedAt: string;
  lives: number;
  gameMode: { name: string };
  _count: { guesses: number };
};

type Meta = { page: number; limit: number; total: number; pages: number };

function GameHistoryPage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [games, setGames] = useState<GameHistoryEntry[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (p: number) => {
      if (!userId) return;
      setLoading(true);
      try {
        const data = await fetchGameHistory(userId, p, 10);
        setGames(data.games);
        setMeta(data.meta);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load history");
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  useEffect(() => {
    load(page);
  }, [page, load]);

  const isWin = (g: GameHistoryEntry) => g.lives > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mt-12">
        <div className="pt-8 pb-6 flex items-center gap-4">
          <BackButton />
          <div>
            <h1 className="text-3xl font-bold">Game History</h1>
            {meta && (
              <p className="text-muted-foreground text-sm mt-1">
                {meta.total} finished game{meta.total !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>

        {error && (
          <Card className="border-destructive/50 mb-6">
            <CardContent className="p-6 text-center text-destructive">
              {error}
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        ) : games.length === 0 ? (
          <Card className="border-border/50">
            <CardContent className="p-12 text-center">
              <Gamepad2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground/40" />
              <p className="text-muted-foreground text-lg">
                No finished games yet
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {games.map((game) => (
              <Card
                key={game.id}
                className="backdrop-blur-sm bg-card/30 border-primary/10 hover:border-primary/25 transition-colors cursor-pointer"
                onClick={() => navigate(`/guesses/${game.id}`)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    {/* Left: mode + location */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          isWin(game)
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-red-500/15 text-red-400"
                        }`}
                      >
                        <Trophy className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate">
                          {game.gameMode.name}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {[game.continent, game.country]
                            .filter(Boolean)
                            .join(" · ") || "Random"}
                        </p>
                      </div>
                    </div>

                    {/* Middle: stats */}
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1.5 text-amber-400">
                        <Target className="w-4 h-4" />
                        <span className="font-bold">
                          {game.score.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Crosshair className="w-4 h-4" />
                        <span>{game._count.guesses} guesses</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>
                          {format(new Date(game.finishedAt), "MMM d, yyyy")}
                        </span>
                      </div>
                    </div>

                    {/* Right: result badge */}
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                        isWin(game)
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-red-500/15 text-red-400"
                      }`}
                    >
                      {isWin(game) ? "Win" : "Loss"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {meta && meta.pages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="border-zinc-800 hover:bg-zinc-800/50"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {meta.page} of {meta.pages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= meta.pages}
              onClick={() => setPage((p) => p + 1)}
              className="border-zinc-800 hover:bg-zinc-800/50"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameHistoryPage;
