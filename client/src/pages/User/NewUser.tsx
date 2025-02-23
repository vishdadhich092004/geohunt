/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { newUser, fetchLeaderboard } from "@/api-clients";
import { ErrorAlert } from "@/components/ErrorAlert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserForm, UserFormData } from "@/components/User/UserForm";

export default function NewUser() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation(newUser, {
    onSuccess: () => {
      navigate("/game-select");
    },
    onError: (err) => {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while creating your account."
      );
    },
  });

  const { data, isLoading } = useQuery(["leaderboard"], () =>
    fetchLeaderboard(1, 15)
  );
  const handleSubmit = (data: UserFormData) => {
    setError(null);
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 mt-10">
      <div className="container max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full max-w-md space-y-4 mx-auto">
          {error && <ErrorAlert message={error} />}
          <UserForm onSubmit={handleSubmit} isLoading={mutation.isLoading} />
        </div>

        <div className="w-full max-w-md mx-auto">
          <Card className="w-full animate-fade-in-up">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Trophy className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Leaderboard</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-2">
                <div className="space-y-3">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    data?.data?.map((player: any, index: any) => (
                      <div
                        key={player.id}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-primary font-medium min-w-[2rem]">
                            {index + 1}
                          </span>
                          <span>{player.username}</span>
                        </div>
                        <span className="text-muted-foreground font-mono">
                          {player.totalScore.toLocaleString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
