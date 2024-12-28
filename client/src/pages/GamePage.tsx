import { useState } from "react";
import StreetView from "../components/StreetView";
function GamePage() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const handleGuessSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const lat = parseFloat(formData.get("latitude") as string);
    const lng = parseFloat(formData.get("longitude") as string);

    if (!isNaN(lat) && !isNaN(lng)) {
      setLatitude(lat);
      setLongitude(lng);
    } else {
      console.error("Invalid latitude or longitude");
    }
  };

  return (
    <div>
      <h1>Game</h1>
      <form onSubmit={handleGuessSubmit}>
        <div>
          <label htmlFor="latitude">Latitude</label>
          <input
            type="text"
            name="latitude"
            id="latitude"
            placeholder="Latitude"
          />
        </div>
        <div>
          <label htmlFor="longitude">Longitude</label>
          <input
            type="text"
            name="longitude"
            id="longitude"
            placeholder="Longitude"
          />
        </div>
        <button type="submit">Submit Guess</button>
      </form>

      {latitude && longitude && <StreetView lat={latitude} lng={longitude} />}
    </div>
  );
}

export default GamePage;
