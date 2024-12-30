import { useMemo, useCallback } from "react";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import haversineDistance from "../utils/haversineDistance";

interface Location {
  latitude: number;
  longitude: number;
}

interface ResultScreenProps {
  actualLocation: Location;
  guessedLocation: { latitude: number; longitude: number };
  onNextRound: () => void;
  score: number;
}

function ResultScreen({
  actualLocation,
  guessedLocation,
  onNextRound,
  score,
}: ResultScreenProps) {
  const distance = useMemo(() => {
    return haversineDistance(actualLocation, guessedLocation);
  }, [actualLocation, guessedLocation]);

  const pathCoordinates = useMemo(
    () => [
      { lat: actualLocation.latitude, lng: actualLocation.longitude },
      { lat: guessedLocation.latitude, lng: guessedLocation.longitude },
    ],
    [actualLocation, guessedLocation]
  );
  const mapOptions = {
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeId: "roadmap",
    gestureHandling: "greedy" as const,
  };

  const onMapLoad = useCallback(
    (map: google.maps.Map) => {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend({
        lat: actualLocation.latitude,
        lng: actualLocation.longitude,
      });
      bounds.extend({
        lat: guessedLocation.latitude,
        lng: guessedLocation.longitude,
      });

      if (actualLocation.latitude && actualLocation.longitude) {
        map.fitBounds(bounds);
      } else {
        map.setZoom(5); // Fallback zoom
      }
    },
    [actualLocation, guessedLocation]
  );

  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-20 ">
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-4xl w-full mx-4 ">
        <h2 className="text-2xl font-bold mb-4">Round Results</h2>

        <div className="h-96 mb-4 rounded-lg overflow-hidden">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={mapOptions}
            center={{
              lat: (actualLocation.latitude + guessedLocation.latitude) / 2,
              lng: (actualLocation.longitude + guessedLocation.longitude) / 2,
            }}
            onLoad={onMapLoad}
          >
            <Marker
              position={{
                lat: actualLocation.latitude,
                lng: actualLocation.longitude,
              }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
              }}
            />
            <Marker
              position={{
                lat: guessedLocation.latitude,
                lng: guessedLocation.longitude,
              }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              }}
            />
            <Polyline
              path={pathCoordinates}
              options={{
                strokeColor: "#FF0000",
                strokeWeight: 4,
              }}
            />
          </GoogleMap>
        </div>

        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span>Actual Location</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
            <span>Your Guess</span>
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-4xl font-bold text-blue-600">
            {(distance / 1000).toFixed(2).toLocaleString()} km
          </p>
          <p className="text-gray-600">away from the target</p>
          <p className="text-xl font-semibold mt-2">Score: {score}</p>
        </div>

        <button
          onClick={onNextRound}
          className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-medium 
                   hover:bg-blue-600 transition-colors"
        >
          Next Round
        </button>
      </div>
    </div>
  );
}

export default ResultScreen;
