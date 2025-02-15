import {
  AdvancedMarker,
  APIProvider,
  Map as GoogleMap,
} from "@vis.gl/react-google-maps";
import { MapPin } from "lucide-react";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
const mapId = import.meta.env.VITE_JS_MAP_ID as string;
interface MapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
}

const AnalyticsMap = ({ latitude, longitude, zoom = 12 }: MapProps) => {
  const position = { lat: latitude, lng: longitude };

  return (
    <div style={{ width: "100%", height: "400px", borderRadius: "8px" }}>
      <APIProvider apiKey={apiKey}>
        <GoogleMap
          defaultCenter={position}
          defaultZoom={zoom}
          gestureHandling={"greedy"}
          mapId={mapId}
          disableDefaultUI
          mapTypeControl={false}
          colorScheme="DARK"
        >
          <AdvancedMarker position={position}>
            <div className="bg-primary text-white p-2 rounded-2xl">
              <MapPin className="w-6 h-6" />
            </div>
          </AdvancedMarker>
        </GoogleMap>
      </APIProvider>
    </div>
  );
};

export default AnalyticsMap;
