import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthContext } from "@/contexts/AuthContext";
import { MapPin } from "lucide-react";

interface NewGameCardProps {
  username?: string;
  isLoading: boolean;
  onStart: () => void;
}

export function NewGameCard({ isLoading, onStart }: NewGameCardProps) {
  const { user } = useAuthContext();
  const username = user?.username;
  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader className="pb-6 pt-8">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary/20 rounded-2xl">
            <MapPin className="h-7 w-7 text-primary" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-3xl font-bold text-primary">
              New Adventure
            </CardTitle>
            <p className="text-sm text-muted-foreground">Begin your journey</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8 px-8 pb-8">
        <div className="space-y-4 bg-primary/5 p-6 rounded-xl border border-primary/10">
          <h3 className="text-2xl font-semibold tracking-tight">
            Welcome{username ? `, ${username}` : ""}!
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Ready to test your geography knowledge? Start a new game and explore
            the world.
          </p>
        </div>

        <Button
          className="w-full"
          size="lg"
          disabled={isLoading}
          onClick={onStart}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-3 py-1">
              <div className="animate-spin h-5 w-5 border-[3px] border-current border-t-transparent rounded-full" />
              <span>Creating game...</span>
            </div>
          ) : (
            <span className="flex items-center justify-center space-x-3 py-1">
              <span>Start New Game</span>
              <MapPin className="h-5 w-5" />
            </span>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
