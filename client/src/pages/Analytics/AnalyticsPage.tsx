import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Trophy,
  Calendar,
  Clock,
  Target,
  GamepadIcon,
  History,
  User,
  MapPin,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { GameType } from "../../../../server/shared/types";
import { UserType } from "../../../../server/shared/types";
import { getAnalytics } from "@/api-clients";
import AnalyticsMap from "./AnalyticsMap";
import StatCard from "@/components/ui/stat-card";
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
      <div className="container mx-auto px-4 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <p className="text-center text-destructive">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 space-y-4">
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (analytics && analytics.totalGames === 0) {
    return (
      <div className="container mx-auto px-4 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <button
              onClick={() => navigate(-1)}
              className="mb-6 flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back
            </button>
            <GamepadIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-center text-muted-foreground">
              No games played yet
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
        >
          <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back
        </button>

        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <User className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2">
            {analytics?.user.username}
          </h1>
          <p className="text-muted-foreground">
            Joined the party on{" "}
            {analytics?.user.createdAt
              ? format(new Date(analytics.user.createdAt), "MMMM dd, yyyy")
              : "N/A"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={GamepadIcon}
            value={analytics?.totalGames || 0}
            label="Games Conquered"
          />
          <StatCard
            icon={Target}
            value={analytics?.averageScore.toFixed(1) || 0}
            label="Average Awesomeness"
          />
          <StatCard
            icon={Calendar}
            value={analytics?.playingSinceInDays || 0}
            label="Days of Glory"
          />
          <StatCard
            icon={Trophy}
            value={analytics?.lastGame?.score || 0}
            label="Latest Triumph"
          />
        </div>

        <Card className="backdrop-blur-lg bg-card/50">
          <CardHeader className="flex flex-row items-center space-x-2">
            <History className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Epic Saga</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">The Beginning</p>
                  <p className="font-medium">
                    {analytics?.firstGame &&
                      format(
                        new Date(analytics.firstGame.startedAt),
                        "MMMM dd, yyyy"
                      )}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Latest Quest</p>
                  <p className="font-medium">
                    {analytics?.lastGame &&
                      format(
                        new Date(analytics.lastGame.startedAt),
                        "MMMM dd, yyyy"
                      )}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-lg bg-card/50 mt-6">
          <CardHeader className="flex flex-row items-center space-x-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Last Seen Adventuring</h2>
          </CardHeader>
          <CardContent>
            {analytics?.lastGame?.currentLocation?.latitude &&
              analytics?.lastGame?.currentLocation?.longitude && (
                <AnalyticsMap
                  latitude={analytics.lastGame.currentLocation.latitude}
                  longitude={analytics.lastGame.currentLocation.longitude}
                />
              )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AnalyticsPage;
