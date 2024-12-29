import { popularAreas } from "./IndiaPopularLocations";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

interface RandomLocationOutput {
  lat: number;
  lng: number;
}

const MAX_RETRIES = 50;

const snapToRoads = async (
  lat: number,
  lng: number
): Promise<RandomLocationOutput | null> => {
  const roadsApiUrl = `https://roads.googleapis.com/v1/snapToRoads?path=${lat},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  try {
    const response = await fetch(roadsApiUrl);
    const data = await response.json();
    if (data.snappedPoints && data.snappedPoints.length > 0) {
      const location = data.snappedPoints[0].location;
      return { lat: location.latitude, lng: location.longitude };
    }
    return null;
  } catch (error) {
    console.error("Error in Roads API:", error);
    return null;
  }
};

const validateStreetViewCoverage = async (
  lat: number,
  lng: number
): Promise<boolean> => {
  const streetViewApiUrl = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${lat},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  try {
    const response = await fetch(streetViewApiUrl);
    const metadata = await response.json();
    return metadata.status === "OK";
  } catch (error) {
    console.error("Error in Street View Metadata API:", error);
    return false;
  }
};

const generateRandomPopularLocation = async (
  retryCount = 0
): Promise<RandomLocationOutput | null> => {
  if (retryCount >= MAX_RETRIES) {
    console.warn("Max retries reached when generating location");
    return null;
  }

  // Select a random area
  const area = popularAreas[Math.floor(Math.random() * popularAreas.length)];
  const randomLat = Math.random() * (area.maxLat - area.minLat) + area.minLat;
  const randomLng = Math.random() * (area.maxLon - area.minLon) + area.minLon;

  // Snap to nearest road
  const snappedLocation = await snapToRoads(randomLat, randomLng);
  if (!snappedLocation) {
    console.warn("Failed to snap location to road, retrying...");
    return generateRandomPopularLocation(retryCount + 1);
  }

  // Check for Street View coverage
  const hasStreetView = await validateStreetViewCoverage(
    snappedLocation.lat,
    snappedLocation.lng
  );
  if (!hasStreetView) {
    console.warn("No Street View coverage, retrying...");
    return generateRandomPopularLocation(retryCount + 1);
  }

  return snappedLocation;
};

export default generateRandomPopularLocation;
