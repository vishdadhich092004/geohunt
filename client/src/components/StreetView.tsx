import { useEffect, useRef, useState } from "react";
import { LoadScriptNext } from "@react-google-maps/api";

interface StreetViewProps {
  lat: number;
  lng: number;
  height?: string;
  width?: string;
}

function StreetView({
  lat,
  lng,
  height = "600px",
  width = "400px",
}: StreetViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded && mapRef.current && window.google) {
      new google.maps.StreetViewPanorama(mapRef.current, {
        position: { lat, lng },
        addressControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_CENTER,
        },
        linksControl: false,
        panControl: false,
        enableCloseButton: false,
      });
    }
  }, [lat, lng, isLoaded]);

  return (
    <div className="relative">
      <LoadScriptNext
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_STREET_VIEW_API_KEY!}
        onLoad={() => setIsLoaded(true)}
        onError={() => console.error("Failed to load Google Maps API")}
      >
        <div ref={mapRef} style={{ height, width }} />
      </LoadScriptNext>
    </div>
  );
}

export default StreetView;
