import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthContext } from "@/contexts/AuthContext";
import { MapPin } from "lucide-react";

interface NewGameCardProps {
  username?: string;
  isLoading: boolean;
  onStart: () => void;
}

export function NewGameCard({
  username,
  isLoading,
  onStart,
}: NewGameCardProps) {
  const { refetchUser } = useAuthContext();
  refetchUser();
  return (
    <Card className="w-full max-w-md animate-fade-in-up">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <MapPin className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">New Adventure</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">
            Welcome{username ? `, ${username}` : ""}!
          </h3>
          <p className="text-muted-foreground">
            Ready to test your geography knowledge? Start a new game and explore
            the world.
          </p>
        </div>

        <Button
          className="w-full group"
          size="lg"
          disabled={isLoading}
          onClick={onStart}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              <span>Creating game...</span>
            </div>
          ) : (
            <span>Start New Game</span>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
