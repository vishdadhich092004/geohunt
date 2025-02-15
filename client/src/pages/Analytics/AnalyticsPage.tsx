import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { GameType } from "../../../../server/shared/types";
import { UserType } from "../../../../server/shared/types";
import { getAnalytics } from "@/api-clients";

interface AnalyticsData {
  totalGames: number;
  firstGame: GameType;
  lastGame: GameType;
  playingSinceInDays: number;
  averageScore: number;
  user: UserType;
}

function AnalyticsPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics(userId!);
        console.log(data);
        setAnalytics(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchAnalytics();
    }
  }, [userId]);

  if (error) {
    return (
      <div className="container mx-auto px-4">
        <p className="text-center text-destructive mt-4">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (analytics && analytics.totalGames === 0) {
    return (
      <div className="container mx-auto px-4">
        <p className="text-center text-muted-foreground mt-4">
          No games played
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </button>

      <h1 className="text-3xl font-bold text-center mb-8">Player Statistics</h1>

      {/* User Information */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold">
          User: {analytics?.user.username}
        </h2>
        <p className="text-sm text-muted-foreground">
          Joined:{" "}
          {analytics?.user.createdAt
            ? format(new Date(analytics.user.createdAt), "MMMM dd, yyyy")
            : "N/A"}
        </p>
        {/* Total Games */}
        <Card className="backdrop-blur-lg bg-card/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                {analytics?.totalGames}
              </div>
              <div className="text-muted-foreground">Total Games</div>
            </div>
          </CardContent>
        </Card>

        {/* Average Score */}
        <Card className="backdrop-blur-lg bg-card/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                {analytics?.averageScore.toFixed(1)}
              </div>
              <div className="text-muted-foreground">Average Score</div>
            </div>
          </CardContent>
        </Card>

        {/* Days Playing */}
        <Card className="backdrop-blur-lg bg-card/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                {analytics?.playingSinceInDays}
              </div>
              <div className="text-muted-foreground">Days Playing</div>
            </div>
          </CardContent>
        </Card>

        {/* Last Game Score */}
        <Card className="backdrop-blur-lg bg-card/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                {analytics?.lastGame?.score}
              </div>
              <div className="text-muted-foreground">Last Game Score</div>
            </div>
          </CardContent>
        </Card>

        {/* Gaming History */}
        <Card className="col-span-1 sm:col-span-2 lg:col-span-4 backdrop-blur-lg bg-card/50">
          <CardHeader>
            <h2 className="text-xl font-semibold">Gaming History</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">First Game</p>
                <p className="font-medium">
                  {analytics?.firstGame &&
                    format(
                      new Date(analytics.firstGame.startedAt),
                      "MMMM dd, yyyy"
                    )}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Latest Game</p>
                <p className="font-medium">
                  {analytics?.lastGame &&
                    format(
                      new Date(analytics.lastGame.startedAt),
                      "MMMM dd, yyyy"
                    )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AnalyticsPage;
