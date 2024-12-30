import { useEffect, useRef, useState } from "react";

interface StreetViewProps {
  lat: number;
  lng: number;
  height?: string;
  width?: string;
  apiKey: string;
}

function StreetView({
  lat,
  lng,
  height = "100vh",
  width = "100vw",
}: StreetViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current || !window.google) return;

    try {
      const panorama = new window.google.maps.StreetViewPanorama(
        mapRef.current,
        {
          position: { lat, lng },
          addressControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_CENTER,
          },
          linksControl: false,
          panControl: false,
          enableCloseButton: false,
          showRoadLabels: false,
          addressControl: false,
          motionTracking: false,
          motionTrackingControl: false,
          zoomControl: true,
          fullscreenControl: false,
        }
      );

      // Add error handling for no imagery
      panorama.addListener("status_changed", () => {
        if (panorama.getStatus() === "ZERO_RESULTS") {
          setLoadError("No Street View imagery available at this location");
        }
      });

      return () => {
        // Cleanup
        if (panorama) {
          panorama.setVisible(false);
        }
      };
    } catch (e) {
      setLoadError(`Failed to load Street View, ${e}`);
    }
  }, [lat, lng]);

  if (loadError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
        <p className="text-red-600">{loadError}</p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <div ref={mapRef} style={{ height, width }} />
    </div>
  );
}

export default StreetView;
