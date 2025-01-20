import { useState, useCallback } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { AdvancedMarker, Map, MapMouseEvent } from "@vis.gl/react-google-maps";

const mapId = import.meta.env.VITE_JS_MAP_ID as string;
console.log(mapId);

interface GuessMapProps {
  onLocationSelect?: (lat: number, lng: number) => void;
  isLoading?: boolean;
}

const GuessMap = ({ onLocationSelect, isLoading = false }: GuessMapProps) => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const mapContainerStyle = {
    width: isExpanded ? "90vw" : "240px",
    height: isExpanded ? "70vh" : "160px",
    transition: "all 0.3s ease-in-out",
  };

  const handleMapClick = useCallback((event: MapMouseEvent) => {
    if (event.detail.latLng) {
      const newLocation = {
        lat: event.detail.latLng.lat,
        lng: event.detail.latLng.lng,
      };
      setSelectedLocation(newLocation);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (selectedLocation && onLocationSelect && !isLoading) {
      onLocationSelect(selectedLocation.lat, selectedLocation.lng);
    }
  }, [selectedLocation, onLocationSelect, isLoading]);

  const toggleSize = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <div className="flex flex-col gap-2 p-2 bg-white/80 backdrop-blur rounded-lg">
      <div className="rounded-lg overflow-hidden shadow-lg relative">
        <Map
          style={mapContainerStyle}
          defaultCenter={defaultCenter}
          defaultZoom={2}
          gestureHandling={"greedy"}
          mapId={mapId}
          onClick={handleMapClick}
        >
          {selectedLocation && <AdvancedMarker position={selectedLocation} />}
        </Map>

        <button
          onClick={toggleSize}
          className="absolute top-2 right-2 p-1 bg-white rounded-md shadow-md hover:bg-gray-100 transition-colors"
          title={isExpanded ? "Minimize map" : "Maximize map"}
        >
          {isExpanded ? (
            <Minimize2 className="w-4 h-4 text-gray-600" />
          ) : (
            <Maximize2 className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedLocation || isLoading}
        className={`py-2 px-4 rounded-lg shadow-lg font-medium transition-colors ${
          selectedLocation && !isLoading
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {isLoading ? "Submitting..." : "Submit Guess"}
      </button>
    </div>
  );
};

const defaultCenter = {
  lat: 20,
  lng: 0,
};

export default GuessMap;
