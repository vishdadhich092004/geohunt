import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { newGame } from "@/api-clients";
import { ErrorAlert } from "../ErrorAlert";
import { NewGameCard } from "./NewGameCard";

export default function NewGame() {
  const location = useLocation();
  const [continent, setContinent] = useState("");
  const [country, setCountry] = useState("");
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
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1604351888999-9ea0a2851e61?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="w-full max-w-md space-y-4 relative z-10">
        {error && <ErrorAlert message={error} />}
        <NewGameCard
          isLoading={mutation.isLoading}
          onStart={handleCreateGame}
        />
      </div>
    </div>
  );
}
