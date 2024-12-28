import { useEffect, useState } from "react";
import StreetView from "../components/StreetView";
import { useParams } from "react-router-dom";
import { fetchGameByGameId, newGuess } from "../api-clients";
import { GameType } from "../../../server/shared/types";

function GamePage() {
  const { gameId } = useParams();
  const [game, setGame] = useState<GameType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGameById = async () => {
      if (!gameId) return;

      try {
        const gameData = await fetchGameByGameId(gameId);
        setGame(gameData);
        setError(null);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch game"
        );
        console.error("Error fetching game:", error);
      }
    };

    fetchGameById();
  }, [gameId]);
  console.log(game);
  const handleGuessSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!gameId) {
      setError("Game ID is missing");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const lat = parseFloat(formData.get("latitude") as string);
    const lng = parseFloat(formData.get("longitude") as string);

    if (isNaN(lat) || isNaN(lng)) {
      setError("Invalid latitude or longitude");
      return;
    }

    try {
      const updatedGame = await newGuess(gameId, lat, lng); // Fetch updated game state
      setGame(updatedGame); // Update the game state
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while submitting your guess."
      );
      console.error("Error submitting guess:", err);
    }
  };

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  if (!game) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Game</h1>
      <h3 className="mb-4">Score: {game.score}</h3>

      {game.currentLocation && (
        <div className="mb-6 w-full h-[600px]">
          <StreetView
            lat={game.currentLocation.latitude}
            lng={game.currentLocation.longitude}
          />
        </div>
      )}

      <form onSubmit={handleGuessSubmit} className="space-y-4 max-w-md">
        <div className="flex flex-col">
          <label htmlFor="latitude" className="mb-1 font-medium">
            Latitude
          </label>
          <input
            type="text"
            name="latitude"
            id="latitude"
            placeholder="Latitude"
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="longitude" className="mb-1 font-medium">
            Longitude
          </label>
          <input
            type="text"
            name="longitude"
            id="longitude"
            placeholder="Longitude"
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Submit Guess
        </button>
      </form>
    </div>
  );
}

export default GamePage;
