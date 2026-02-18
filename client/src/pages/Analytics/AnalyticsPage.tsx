import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
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
import BackButton from "@/components/BackButton";
import { getUserBadges } from "@/components/Leaderboard/GetUserBadges";
import BadgeGuide from "@/components/Leaderboard/BadgeGuide";

interface AnalyticsData {
  // Existing fields the page uses
  totalGames: number;
  firstGame: GameType;
  lastGame: GameType;
  playingSinceInDays: number;
  averageScore: number;
  user: UserType;
  // New enriched fields
  totalScore: number;
  bestScore: number;
  averageDistance: number | null;
  bestDistance: number | null;
  winRate: number;
  currentStreak: number;
  bestStreak: number;
  mostPlayedContinent: string | null;
}

function AnalyticsPage() {
  const { userId } = useParams();
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
      <div className="container mx-auto p-4 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md border-destructive/50">
          <CardContent className="p-6 ">
            <BackButton />
            <p className="text-center text-destructive mt-4">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-24 w-full max-w-3xl mx-auto rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (analytics && analytics.totalGames === 0) {
    return (
      <div className="container mx-auto p-4 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md border border-border/50">
          <CardContent className="p-8">
            <BackButton />
            <div className="mt-6 text-center">
              <GamepadIcon className="w-16 h-16 mx-auto mb-6 text-primary/60" />
              <p className="text-lg text-muted-foreground">
                No adventures recorded yet
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="pt-8 pb-6">
          <BackButton />
        </div>

        {/* Top Section - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Badge Guide - Left Side */}
          <div>
            <Card className="backdrop-blur-sm bg-card/30 border-primary/10 h-full">
              <CardHeader className="flex flex-row items-center space-x-3">
                <Trophy className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Achievement Badges</h2>
              </CardHeader>
              <CardContent>
                <BadgeGuide />
              </CardContent>
            </Card>
          </div>

          {/* User Details - Right Side */}
          <div>
            <Card className="backdrop-blur-sm bg-card/30 border-primary/10 h-full">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 ring-2 ring-primary/20 backdrop-blur-sm">
                    <User className="w-10 h-10 text-primary" />
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    {analytics?.user.username}
                  </h1>
                  <p className="text-xl text-muted-foreground mb-6">
                    Adventuring since{" "}
                    {analytics?.user.createdAt
                      ? format(
                          new Date(analytics.user.createdAt),
                          "MMMM dd, yyyy"
                        )
                      : "N/A"}
                  </p>

                  {/* User Badges */}
                  {analytics && (
                    <div className="flex flex-wrap justify-center gap-3">
                      {getUserBadges({
                        username: analytics.user.username,
                        totalScore:
                          analytics.averageScore * analytics.totalGames,
                        createdAt: analytics.user.createdAt,
                        id: analytics.user.id,
                      }).map((badge, index) => (
                        <div
                          key={index}
                          className={`px-3 py-1.5 rounded-full ${badge.bgColor} ${badge.textColor} 
                            flex items-center gap-2 transition-colors duration-200`}
                          title={badge.tooltip}
                        >
                          {badge.icon}
                          <span className="text-sm font-medium">
                            {badge.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <StatCard
            icon={GamepadIcon}
            value={analytics?.totalGames || 0}
            label="Total Adventures"
            className="backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-colors"
          />
          <StatCard
            icon={Target}
            value={analytics?.averageScore.toFixed(0) || 0}
            label="Average Score"
            className="backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-colors"
          />
          <StatCard
            icon={Calendar}
            value={analytics?.playingSinceInDays || 0}
            label="Days Active"
            className="backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-colors"
          />
          <StatCard
            icon={Trophy}
            value={analytics?.bestScore?.toLocaleString() || 0}
            label="Best Score"
            className="backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-colors"
          />
          <StatCard
            icon={Trophy}
            value={`${analytics?.winRate ?? 0}%`}
            label="Win Rate"
            className="backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-colors"
          />
          <StatCard
            icon={History}
            value={analytics?.currentStreak || 0}
            label="Current Streak"
            className="backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-colors"
          />
          <StatCard
            icon={History}
            value={analytics?.bestStreak || 0}
            label="Best Streak"
            className="backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-colors"
          />
          <StatCard
            icon={MapPin}
            value={
              analytics?.bestDistance != null
                ? `${analytics.bestDistance.toLocaleString()} km`
                : "—"
            }
            label="Best Guess Distance"
            className="backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-colors"
          />
        </div>

        {/* Timeline Card */}
        <Card className="backdrop-blur-sm bg-card/30 border-primary/10 mb-6">
          <CardHeader className="flex flex-row items-center space-x-3">
            <History className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold">Journey Timeline</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-center space-x-4 p-4 rounded-lg bg-primary/5">
                <Clock className="w-6 h-6 text-primary/60" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    First Adventure
                  </p>
                  <p className="text-lg font-medium">
                    {analytics?.firstGame &&
                      format(
                        new Date(analytics.firstGame.startedAt),
                        "MMMM dd, yyyy"
                      )}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-lg bg-primary/5">
                <Clock className="w-6 h-6 text-primary/60" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Latest Adventure
                  </p>
                  <p className="text-lg font-medium">
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

        {/* Map Card */}
        <Card className="backdrop-blur-sm bg-card/30 border-primary/10">
          <CardHeader className="flex flex-row items-center space-x-3">
            <MapPin className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold">Last Known Location</h2>
          </CardHeader>
          <CardContent className="p-0 overflow-hidden rounded-b-lg">
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
