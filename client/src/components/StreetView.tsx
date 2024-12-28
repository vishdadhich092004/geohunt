import { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (mapRef.current && window.google) {
      const panorama = new google.maps.StreetViewPanorama(mapRef.current, {
        position: { lat, lng },
        addressControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_CENTER,
        },
        linksControl: false,
        panControl: false,
        enableCloseButton: false,
      });
    }
  }, [lat, lng]);

  return (
    <div className="relative">
      <LoadScriptNext
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!}
      >
        <div ref={mapRef} style={{ height, width }} />
      </LoadScriptNext>
    </div>
  );
}

export default StreetView;
