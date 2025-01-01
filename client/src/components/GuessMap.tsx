import { useState, useCallback } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Maximize2, Minimize2 } from "lucide-react";

interface GuessMapProps {
  apiKey: string;
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

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
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
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={2}
          center={defaultCenter}
          onClick={handleMapClick}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            minZoom: 2,
            maxZoom: 24,
            restriction: {
              latLngBounds: {
                north: 85,
                south: -85,
                west: -180,
                east: 180,
              },
              strictBounds: true,
            },
          }}
        >
          {selectedLocation && (
            <Marker
              position={selectedLocation}
              animation={google.maps.Animation.DROP}
            />
          )}
        </GoogleMap>

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
