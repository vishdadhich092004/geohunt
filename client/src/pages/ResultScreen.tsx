import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import haversineDistance from "@/utils/haversineDistance";
import { ResultMap } from "@/components/Result/ResultMap";
import { ResultLegend } from "@/components/Result/ResultLegend";
import { getScoreMessage } from "@/utils/getMessage";

interface Location {
  latitude: number;
  longitude: number;
}

interface ResultScreenProps {
  actualLocation: Location;
  guessedLocation: Location;
  onNextRound: () => void;
  currentRoundScore: number;
}

function ResultScreen({
  actualLocation,
  guessedLocation,
  onNextRound,
  currentRoundScore,
}: ResultScreenProps) {
  const distance = useMemo(
    () => haversineDistance(actualLocation, guessedLocation),
    [actualLocation, guessedLocation]
  );

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl animate-fade-in-up">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2">
            <MapPin className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Round Results</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResultMap
            actualLocation={actualLocation}
            guessedLocation={guessedLocation}
          />

          <ResultLegend distance={distance} score={currentRoundScore} />

          <div className="text-center text-lg font-medium text-white">
            {getScoreMessage(currentRoundScore)}
          </div>

          <Button onClick={onNextRound} className="w-full" size="lg">
            Next Round
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default ResultScreen;
