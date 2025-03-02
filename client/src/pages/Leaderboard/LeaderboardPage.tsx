import { useQuery } from "react-query";
import { fetchLeaderboard } from "@/api-clients";
import { ErrorAlert } from "@/components/ErrorAlert";
import { LeaderboardHeader } from "@/components/Leaderboard/LeaderboardHeader";
import { LeaderboardLoading } from "@/components/Leaderboard/LeaderboardLoading";
import { LeaderboardTable } from "@/components/Leaderboard/LeaderboardTable";
import { useState } from "react";
import { LeaderboardFooter } from "@/components/Leaderboard/LeaderboardFooter";
import BackButton from "@/components/BackButton";
import { BadgeGuide } from "@/components/Leaderboard/BadgeGuide";

export default function LeaderboardPage() {
  const [page, setPage] = useState(1);
  const {
    data: response,
    isLoading,
    error,
  } = useQuery(["leaderboard", page], () => fetchLeaderboard(page, 15));
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 mt-12">
        <BackButton />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-4">
          <BadgeGuide />
          <div className="lg:col-span-3">
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
                <>
                  <LeaderboardTable
                    entries={response.data}
                    currentPage={page}
                    limit={15}
                  />
                  <LeaderboardFooter
                    currentPage={page}
                    totalPages={response.meta.totalPages}
                    onPageChange={setPage}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
