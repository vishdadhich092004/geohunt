import { useState, useCallback } from "react";
import { MapPin, Maximize2, Minimize2 } from "lucide-react";
import { AdvancedMarker, Map, MapMouseEvent } from "@vis.gl/react-google-maps";
import { Button } from "../ui/button";
import { CoordinatesType } from "../../../../server/shared/types";
const mapId = import.meta.env.VITE_JS_MAP_ID as string;

interface Location {
  lat: number;
  lng: number;
}
interface GuessMapProps {
  onLocationSelect?: (lat: number, lng: number) => void;
  isGuessing?: boolean;
  selectedLocation: Location;
  setSelectedLocation: (arg0: Location | null) => void;
  currentRoundLocation: CoordinatesType;
}

const GuessMap = ({
  onLocationSelect,
  isGuessing = false,
  selectedLocation,
  setSelectedLocation,
  currentRoundLocation,
}: GuessMapProps) => {
  const [isFullyExpanded, setIsFullyExpanded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isControlsHovered, setIsControlsHovered] = useState(false);

  const mapContainerStyle = {
    width: isFullyExpanded
      ? "min(80vw, 800px)" // Limit maximum width when fully expanded
      : isExpanded
      ? "min(90vw, 400px)" // Limit width when hover-expanded
      : "min(85vw, 200px)", // Smaller base width
    height: isFullyExpanded
      ? "min(50vh, 400px)" // Limit height when fully expanded
      : isExpanded
      ? "min(40vh, 300px)" // Limit height when hover-expanded
      : "min(30vh, 150px)", // Smaller base height
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
    <div className="flex flex-col gap-2 p-2 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-lg shadow-xl max-w-[90vw]">
      <div className="rounded-lg overflow-hidden shadow-lg relative">
        <Map
          key={`map-${currentRoundLocation.latitude}-${currentRoundLocation.longitude}`}
          style={mapContainerStyle}
          defaultCenter={defaultCenter}
          defaultZoom={2}
          gestureHandling={"greedy"}
          mapId={mapId}
          onMouseover={handleMapMouseOver}
          onMouseout={handleMapMouseOut}
          onClick={handleMapClick}
          fullscreenControl={true}
          fullscreenControlOptions={{
            position: 1,
          }}
          streetViewControl={false}
        >
          {selectedLocation && (
            <AdvancedMarker position={selectedLocation}>
              <div className="bg-primary text-white p-1 rounded-lg">
                <MapPin className="w-5 h-5" />
              </div>
            </AdvancedMarker>
          )}
        </Map>

        {isGuessing && (
          <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        )}

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
