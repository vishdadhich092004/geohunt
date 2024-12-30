import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface GameScoreProps {
  score: number;
}

export function GameScore({ score }: GameScoreProps) {
  return (
    <Card className="bg-background/80 backdrop-blur p-3 animate-fade-in">
      <div className="flex items-center space-x-2">
        <Trophy className="h-5 w-5 text-primary" />
        <span className="font-bold text-lg">Score: {score}</span>
      </div>
    </Card>
  );
}
