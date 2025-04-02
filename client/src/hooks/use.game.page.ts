import { GameType } from "../../../server/shared/types";
import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { GameModeType } from "../../../server/shared/types";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
const libraries: ("places" | "drawing" | "geometry")[] = ["places"];

export const useGamePage = () => {
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
  return {
    selectedLocation,
    setSelectedLocation,
    game,
    setGame,
    error,
    setError,
    isGuessing,
    setIsGuessing,
    currentRoundLocation,
    setCurrentRoundLocation,
    showingResults,
    setShowingResults,
    lastGuess,
    setLastGuess,
    previousLives,
    setPreviousLives,
    showLifeAlert,
    setShowLifeAlert,
    lifeChangeType,
    setLifeChangeType,
    showGameModeExplanation,
    setShowGameModeExplanation,
    gameMode,
    setGameMode,
    isLoaded,
    loadError,
    timeRemaining,
    setTimeRemaining,
  };
};
