import { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import StreetView from "../../components/Map/StreetView";
import { useParams } from "react-router-dom";
import { fetchGameByGameId, newGuess, newGame } from "../../api-clients";
import { GameType, GameModeType } from "../../../../server/shared/types";
import GuessMap from "../../components/Map/GuessMap";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import ResultScreen from "../../components/Map/ResultScreen";
import { APIProvider } from "@vis.gl/react-google-maps";
import { HashLoader } from "react-spinners";
import GameHeader from "@/components/Game/GameHeader";
import GameOver from "@/components/Game/GameOver";
import LifeChangeAlert from "@/components/Game/LifeChangeAlert";
import GameModeExplanationAlert from "@/components/Game/GameModeExplanationAlert";
import TimeOver from "@/components/Game/TimeOver";
import LocationsOver from "@/components/Game/LocationsOver";
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
  const [previousLives, setPreviousLives] = useState<number | null>(null);
  const [showLifeAlert, setShowLifeAlert] = useState(false);
  const [lifeChangeType, setLifeChangeType] = useState<
    "increase" | "decrease" | null
  >(null);
  const [showGameModeExplanation, setShowGameModeExplanation] = useState(true);
  const [gameMode, setGameMode] = useState<GameModeType | null>(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries,
  });
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    const fetchGameById = async () => {
      if (!gameId) return;
      try {
        const gameData = await fetchGameByGameId(gameId);
        setGame(gameData);
        setGameMode(gameData.gameMode);
        setTimeRemaining(gameData.timeRemaining);
        setCurrentRoundLocation(gameData.currentLocation);
        setError(null);
      } catch (error) {
        // Handle 429 error specifically
        if (error instanceof Error && error.message.includes("429")) {
          try {
            // Create a new game when rate limit is exceeded
            const newGameData = await newGame();
            setGame(newGameData);
            setGameMode(newGameData.gameMode);
            setTimeRemaining(newGameData.timeRemaining);
            setCurrentRoundLocation(newGameData.currentLocation);
            setError(null);
          } catch (createError) {
            setError(
              createError instanceof Error
                ? createError.message
                : "Failed to create new game"
            );
          }
        } else {
          setError(
            error instanceof Error ? error.message : "Failed to fetch game"
          );
        }
      }
    };

    fetchGameById();
  }, [gameId]);

  useEffect(() => {
    if (previousLives !== null && game?.lives !== undefined) {
      if (game.lives !== previousLives) {
        if (game.lives > previousLives) {
          setLifeChangeType("increase");
          setShowLifeAlert(true);
        } else if (game.lives < previousLives) {
          setLifeChangeType("decrease");
          setShowLifeAlert(true);
        }
        const timer = setTimeout(() => setShowLifeAlert(false), 3000);
        return () => clearTimeout(timer);
      }
    }
    setPreviousLives(game?.lives ?? null);
  }, [game?.lives, previousLives]);

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
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md w-full">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {loadError ? "Failed to load Google Maps" : error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!isLoaded || !game) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <HashLoader color="hsl(38, 92%, 56%)" />
      </div>
    );
  }

  if (game.maxLocations !== null && game.guesses.length >= game.maxLocations) {
    return <LocationsOver score={game?.score || 0} />;
  }
  if (game.lives <= 0) {
    return <GameOver score={game?.score || 0} />;
  }
  if (timeRemaining && timeRemaining <= 0) {
    return <TimeOver score={game?.score || 0} />;
  }

  return (
    <APIProvider apiKey={GOOGLE_API_KEY}>
      <div className="relative h-screen w-screen overflow-hidden bg-zinc-950">
        {/* Lives Explanation Alert */}
        {showGameModeExplanation && (
          <GameModeExplanationAlert
            gameMode={gameMode!}
            setShowGameModeExplanation={setShowGameModeExplanation}
          />
        )}

        {/* Life Change Alert */}
        {showLifeAlert && lifeChangeType && (
          <LifeChangeAlert lifeChangeType={lifeChangeType} />
        )}

        {/* Game Header */}
        {game && currentRoundLocation && (
          <GameHeader
            isGuessing={isGuessing}
            timeRemaining={timeRemaining!}
            setTimeRemaining={setTimeRemaining}
            timeLimit={game.timeLimit}
            startedAt={game.startedAt}
            score={game.score}
            lives={game.lives}
            currentRoundLocation={currentRoundLocation}
          />
        )}

        {/* Results Screen */}
        {showingResults && lastGuess && currentRoundLocation && (
          <ResultScreen
            lives={game.lives}
            actualLocation={currentRoundLocation}
            guessedLocation={lastGuess}
            onNextRound={handleNextRound}
            currentRoundScore={game.currentRoundScore}
          />
        )}

        {/* Street View */}
        {currentRoundLocation && (
          <div className="absolute inset-0 z-0">
            <StreetView
              lat={currentRoundLocation.latitude}
              lng={currentRoundLocation.longitude}
            />
          </div>
        )}

        {/* Guess Map */}
        <div className="absolute bottom-8 right-4 z-10 transition-transform duration-300 hover:scale-105">
          <GuessMap
            selectedLocation={selectedLocation!}
            setSelectedLocation={setSelectedLocation}
            onLocationSelect={handleLocationSelect}
            isGuessing={isGuessing}
            currentRoundLocation={currentRoundLocation!}
          />
        </div>
      </div>
    </APIProvider>
  );
}

export default GamePage;
