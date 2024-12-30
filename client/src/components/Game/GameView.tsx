import ResultScreen from "@/pages/ResultScreen";
import { GameScore } from "./GameScore";
import StreetView from "../StreetView";
import { LocationType } from "../../../../server/shared/types";
import GuessMap from "../GuessMap";

interface GameViewProps {
  apiKey: string;
  score: number;
  lastGuess: { latitude: number; longitude: number };
  currentLocation: LocationType;
  showResults: boolean;
  isGuessing: boolean;
  onLocationSelect: (latitude: number, longitude: number) => void;
  onNextRound: () => void;
}

export function GameView({
  apiKey,
  score,
  currentLocation,
  showResults,
  lastGuess,
  isGuessing,
  onLocationSelect,
  onNextRound,
}: GameViewProps) {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <GameScore score={score} />
      </div>

      {showResults && lastGuess && (
        <ResultScreen
          actualLocation={currentLocation}
          guessedLocation={lastGuess}
          onNextRound={onNextRound}
          score={score}
        />
      )}

      <StreetView
        apiKey={apiKey}
        lat={currentLocation.latitude}
        lng={currentLocation.longitude}
      />

      <div className="absolute bottom-4 right-4 z-10">
        <GuessMap
          apiKey={apiKey}
          onLocationSelect={onLocationSelect}
          isLoading={isGuessing}
        />
      </div>
    </div>
  );
}
