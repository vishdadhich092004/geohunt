import { useState, useCallback } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { AdvancedMarker, Map, MapMouseEvent } from "@vis.gl/react-google-maps";
import { Button } from "./ui/button";

const mapId = import.meta.env.VITE_JS_MAP_ID as string;

interface GuessMapProps {
  onLocationSelect?: (lat: number, lng: number) => void;
  isGuessing?: boolean;
}

const GuessMap = ({ onLocationSelect, isGuessing = false }: GuessMapProps) => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isFullyExpanded, setIsFullyExpanded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isControlsHovered, setIsControlsHovered] = useState(false);

  const mapContainerStyle = {
    width: (isFullyExpanded && "70vw") || (isExpanded && "35vw") || "240px",
    height: (isFullyExpanded && "30vw") || (isExpanded && "25vw") || "160px",
    transition: "all 0.3s ease-in-out",
  };

  const handleMapClick = useCallback((event: MapMouseEvent) => {
    if (event.detail?.latLng) {
      const newLocation = {
        lat: event.detail.latLng.lat,
        lng: event.detail.latLng.lng,
      };
      setSelectedLocation(newLocation);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (selectedLocation && onLocationSelect && !isGuessing) {
      onLocationSelect(selectedLocation.lat, selectedLocation.lng);
    }
  }, [selectedLocation, onLocationSelect, isGuessing]);

  const toggleSize = useCallback(() => {
    setIsFullyExpanded((prev) => !prev);
    setIsExpanded(false);
  }, []);

  const handleMapMouseOver = () => {
    if (!isFullyExpanded && !isControlsHovered) {
      setIsExpanded(true);
    }
  };

  const handleMapMouseOut = () => {
    if (!isFullyExpanded && !isControlsHovered) {
      setIsExpanded(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-2 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-lg shadow-xl">
      <div className="rounded-lg overflow-hidden shadow-lg relative">
        <Map
          style={mapContainerStyle}
          defaultCenter={defaultCenter}
          defaultZoom={2}
          gestureHandling={"greedy"}
          mapId={mapId}
          onMouseover={handleMapMouseOver}
          onMouseout={handleMapMouseOut}
          onClick={handleMapClick}
          fullscreenControl={false}
          streetViewControl={false}
        >
          {selectedLocation && <AdvancedMarker position={selectedLocation} />}
        </Map>

        {/* Controls Container */}
        <div
          className="absolute top-1 right-1"
          onMouseEnter={() => setIsControlsHovered(true)}
          onMouseLeave={() => setIsControlsHovered(false)}
        >
          <Button
            onClick={toggleSize}
            className="p-2 bg-zinc-800/90 border border-zinc-700/50 
                     rounded-md shadow-lg hover:bg-zinc-700/90 transition-all duration-300"
            title={isFullyExpanded ? "Minimize map" : "Maximize map"}
          >
            {isFullyExpanded ? (
              <Minimize2 className="w-4 h-4 text-zinc-300" />
            ) : (
              <Maximize2 className="w-4 h-4 text-zinc-300" />
            )}
          </Button>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!selectedLocation || isGuessing}
        className={`py-2 px-4 rounded-lg shadow-lg font-medium transition-all duration-300 ${
          selectedLocation && !isGuessing
            ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 text-zinc-900"
            : "bg-zinc-800/50 text-zinc-500 border border-zinc-700/50 cursor-not-allowed"
        }`}
      >
        <span className="hidden sm:inline">
          {isGuessing ? "Submitting..." : "Submit Guess"}
        </span>
        <span className="sm:hidden">{isGuessing ? "..." : "Guess"}</span>
      </Button>
    </div>
  );
};

const defaultCenter = {
  lat: 20,
  lng: 0,
};

export default GuessMap;
