import { useCallback, useMemo } from "react";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";

interface Location {
  latitude: number;
  longitude: number;
}

interface ResultMapProps {
  actualLocation: Location;
  guessedLocation: Location;
}

export function ResultMap({ actualLocation, guessedLocation }: ResultMapProps) {
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
    styles: [
      {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [{ color: "#ffffff" }],
      },
      {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [{ visibility: "on" }, { color: "#3e606f" }, { weight: 2 }],
      },
    ],
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
      map.fitBounds(bounds);
    },
    [actualLocation, guessedLocation]
  );

  return (
    <div className="h-[40vh] md:h-[50vh] lg:h-[60vh] rounded-lg overflow-hidden">
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
            url:
              "data:image/svg+xml," +
              encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="hsl(142.1 70.6% 45.3%)" width="32" height="32">
                <circle cx="12" cy="12" r="10" fill="currentColor"/>
                <circle cx="12" cy="12" r="4" fill="white"/>
              </svg>
            `),
            anchor: new google.maps.Point(16, 16),
          }}
        />
        <Marker
          position={{
            lat: guessedLocation.latitude,
            lng: guessedLocation.longitude,
          }}
          icon={{
            url:
              "data:image/svg+xml," +
              encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="hsl(0 72.2% 50.6%)" width="32" height="32">
                <circle cx="12" cy="12" r="10" fill="currentColor"/>
                <circle cx="12" cy="12" r="4" fill="white"/>
              </svg>
            `),
            anchor: new google.maps.Point(16, 16),
          }}
        />
        <Polyline
          path={pathCoordinates}
          options={{
            strokeColor: "hsl(0 72.2% 50.6%)",
            strokeWeight: 3,
            strokeOpacity: 0.8,
          }}
        />
      </GoogleMap>
    </div>
  );
}
