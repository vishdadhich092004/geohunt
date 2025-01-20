import { useMap } from "@vis.gl/react-google-maps";
import { useRef, useEffect } from "react";

export function Polyline({
  coordinates,
}: {
  coordinates: google.maps.LatLngLiteral[];
}) {
  const map = useMap();
  const lineRef = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (map) {
      if (lineRef.current) {
        lineRef.current.setMap(null);
      }

      const lineSymbol = {
        path: "M 0,-1 0,1",
        strokeOpacity: 1,
        scale: 3,
      };
      lineRef.current = new google.maps.Polyline({
        path: coordinates,
        geodesic: true,
        strokeColor: "#004",
        strokeOpacity: 0,
        strokeWeight: 1,
        map: map,
        icons: [
          {
            icon: lineSymbol,
            offset: "1",
            repeat: "15px",
          },
        ],
      });
    }

    return () => {
      if (lineRef.current) {
        lineRef.current.setMap(null);
      }
    };
  }, [map, coordinates]);

  return null;
}
