import { GameModes } from "@/components/Modes/GameModes";
import { useState, useEffect } from "react";
import LocationSelect from "../Locations/LocationSelect";
import { useNavigate } from "react-router-dom";

function GameSelect() {
  const navigate = useNavigate();
  const [gameModeId, setGameModeId] = useState<string | null>(null);
  const [continent, setContinent] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const handleBack = () => {
    setGameModeId(null);
  };

  useEffect(() => {
    if (gameModeId && continent && country) {
      navigate(
        `/games?continent=${continent}&country=${country}&gameModeId=${gameModeId}`
      );
    }
  }, [gameModeId, continent, country, navigate]);

  return (
    <div
      className="flex flex-col space-y-4 mb-10 grow bg-white to-background text-white"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1503431128871-cd250803fa41?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundSize: "cover",
      }}
    >
      {!gameModeId && <GameModes setGameModeId={setGameModeId} />}
      {gameModeId && !continent && !country && (
        <div>
          <LocationSelect
            setContinent={setContinent}
            setCountry={setCountry}
            handleBack={handleBack}
          />
        </div>
      )}
    </div>
  );
}

export default GameSelect;
