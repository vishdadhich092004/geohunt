import { useQuery } from "react-query";
import { fetchLeaderboard } from "@/api-clients";
import { ErrorAlert } from "@/components/ErrorAlert";
import { LeaderboardHeader } from "@/components/Leaderboard/LeaderboardHeader";
import { LeaderboardLoading } from "@/components/Leaderboard/LeaderboardLoading";
import { LeaderboardTable } from "@/components/Leaderboard/LeaderboardTable";
export default function LeaderboardPage() {
  const {
    data: entries,
    isLoading,
    error,
  } = useQuery("leaderboard", fetchLeaderboard);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 mt-12">
        <LeaderboardHeader />
        <div className="max-w-4xl mx-auto">
          {error ? (
            <ErrorAlert
              title="Failed to load leaderboard"
              message="Please try again later."
            />
          ) : isLoading ? (
            <LeaderboardLoading />
          ) : (
            <LeaderboardTable entries={entries} />
          )}
        </div>
      </div>
    </div>
  );
}
