import { useMemo } from "react";
import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { Polyline } from "./Polyline";
import { MapPin } from "lucide-react";
interface Location {
  latitude: number;
  longitude: number;
}

interface ResultMapProps {
  actualLocation: Location;
  guessedLocation: Location;
}

const mapId = import.meta.env.VITE_JS_MAP_ID as string;

export function ResultMap({ actualLocation, guessedLocation }: ResultMapProps) {
  const pathCoordinates = useMemo(
    () => [
      { lat: actualLocation.latitude, lng: actualLocation.longitude },
      { lat: guessedLocation.latitude, lng: guessedLocation.longitude },
    ],
    [actualLocation, guessedLocation]
  );

  const defaultBounds = useMemo(() => {
    const minLat = Math.min(actualLocation.latitude, guessedLocation.latitude);
    const maxLat = Math.max(actualLocation.latitude, guessedLocation.latitude);
    const minLng = Math.min(
      actualLocation.longitude,
      guessedLocation.longitude
    );
    const maxLng = Math.max(
      actualLocation.longitude,
      guessedLocation.longitude
    );

    return {
      north: maxLat,
      south: minLat,
      east: maxLng,
      west: minLng,
    };
  }, [actualLocation, guessedLocation]);

  return (
    <div className="w-full h-96 ">
      <Map
        mapId={mapId}
        defaultZoom={4}
        defaultCenter={{
          lat: (actualLocation.latitude + guessedLocation.latitude) / 2,
          lng: (actualLocation.longitude + guessedLocation.longitude) / 2,
        }}
        clickableIcons={false}
        defaultBounds={defaultBounds}
        disableDefaultUI={true}
      >
        <Polyline coordinates={pathCoordinates} />

        <AdvancedMarker
          position={{
            lat: actualLocation.latitude,
            lng: actualLocation.longitude,
          }}
        >
          <div className="bg-primary text-white p-1 rounded-lg">
            <MapPin className="w-5 h-5" />
          </div>
        </AdvancedMarker>

        <AdvancedMarker
          position={{
            lat: guessedLocation.latitude,
            lng: guessedLocation.longitude,
          }}
        >
          <div className="bg-red-800 text-white p-1 rounded-lg">
            <MapPin className=" bg-red-800 w-5 h-5" />
          </div>
        </AdvancedMarker>
      </Map>
    </div>
  );
}
