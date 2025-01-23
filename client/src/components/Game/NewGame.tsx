import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useAuthContext } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { newGame } from "@/api-clients";
import { ErrorAlert } from "../ErrorAlert";
import { NewGameCard } from "./NewGameCard";

export default function NewGame() {
  const location = useLocation();
  const [continent, setContinent] = useState("");
  const [country, setCountry] = useState("");
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const continent = searchParams.get("continent");
    setContinent(continent!);
    const country = searchParams.get("country");
    setCountry(country!);
  }, [location.search]);

  const mutation = useMutation(() => newGame(continent, country), {
    onSuccess: (data) => {
      navigate(`/guesses/${data.id}`);
    },
    onError: (err) => {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while creating the game."
      );
    },
  });

  const handleCreateGame = () => {
    setError(null);
    mutation.mutate();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {error && <ErrorAlert message={error} />}
        <NewGameCard
          username={user?.username}
          isLoading={mutation.isLoading}
          onStart={handleCreateGame}
        />
      </div>
    </div>
  );
}
