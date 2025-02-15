import { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import StreetView from "../../components/Map/StreetView";
import { useParams } from "react-router-dom";
import { fetchGameByGameId, newGuess } from "../../api-clients";
import { GameType } from "../../../../server/shared/types";
import GuessMap from "../../components/Map/GuessMap";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import ResultScreen from "../../components/Map/ResultScreen";
import { APIProvider } from "@vis.gl/react-google-maps";
import { HashLoader } from "react-spinners";
import GameHeader from "@/components/Game/GameHeader";
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
const libraries: ("places" | "drawing" | "geometry")[] = ["places"];

function GamePage() {
  const { gameId } = useParams();
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [game, setGame] = useState<GameType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGuessing, setIsGuessing] = useState(false);
  const [currentRoundLocation, setCurrentRoundLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [showingResults, setShowingResults] = useState(false);
  const [lastGuess, setLastGuess] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries,
  });

  useEffect(() => {
    const fetchGameById = async () => {
      if (!gameId) return;
      try {
        const gameData = await fetchGameByGameId(gameId);
        setGame(gameData);
        setCurrentRoundLocation(gameData.currentLocation);
        setError(null);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch game"
        );
      }
    };

    fetchGameById();
  }, [gameId]);

  const handleLocationSelect = async (latitude: number, longitude: number) => {
    if (!gameId) {
      setError("Game ID is missing");
      return;
    }

    setIsGuessing(true);
    try {
      const updatedGame = await newGuess(gameId, latitude, longitude);
      setGame(updatedGame);
      setLastGuess({ latitude, longitude });
      setShowingResults(true);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while submitting your guess."
      );
    } finally {
      setIsGuessing(false);
    }
  };

  const handleNextRound = () => {
    setShowingResults(false);
    setLastGuess(null);
    setCurrentRoundLocation(game?.currentLocation || null);
    setSelectedLocation(null);
  };

  if (loadError || error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {loadError ? "Failed to load Google Maps" : error}
        </AlertDescription>
      </Alert>
    );
  }

  if (!isLoaded || !game) {
    return (
      <div className="flex h-screen items-center justify-center">
        <HashLoader color="#228B22" />
      </div>
    );
  }

  return (
    <APIProvider apiKey={GOOGLE_API_KEY}>
      <div className="relative h-screen w-screen overflow-hidden">
        <GameHeader
          score={game.score}
          currentRoundLocation={currentRoundLocation!}
        />

        {showingResults && lastGuess && currentRoundLocation && (
          <ResultScreen
            actualLocation={currentRoundLocation}
            guessedLocation={lastGuess}
            onNextRound={handleNextRound}
            currentRoundScore={game.currentRoundScore}
          />
        )}

        {currentRoundLocation && (
          <StreetView
            lat={currentRoundLocation.latitude}
            lng={currentRoundLocation.longitude}
          />
        )}

        <div className="absolute bottom-4 right-4 z-10">
          <GuessMap
            selectedLocation={selectedLocation!}
            setSelectedLocation={setSelectedLocation}
            onLocationSelect={handleLocationSelect}
            isGuessing={isGuessing}
          />
        </div>
      </div>
    </APIProvider>
  );
}

export default GamePage;
