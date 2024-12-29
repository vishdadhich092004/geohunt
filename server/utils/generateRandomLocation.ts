import { popularAreas } from "./IndiaPopularLocations";

interface RandomLocationOutput {
  lat: number;
  lng: number;
}

interface StreetViewResponse {
  status: string;
  location: {
    lat: number;
    lng: number;
  };
}

const MAX_RETRIES = 10;

const generateRandomPopularLocation = async (
  retryCount = 0
): Promise<RandomLocationOutput | null> => {
  if (retryCount >= MAX_RETRIES) {
    console.warn("Max retries reached when generating location");
    return null; // Explicitly return null
  }

  // Select a random area
  const area = popularAreas[Math.floor(Math.random() * popularAreas.length)];

  // Generate a random lat/lng within the selected bounding box
  const randomLat = Math.random() * (area.maxLat - area.minLat) + area.minLat;
  const randomLng = Math.random() * (area.maxLon - area.minLon) + area.minLon;

  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error("Google Maps API key is not configured");
  }

  // Validate using Street View API
  const streetViewApiUrl = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${randomLat},${randomLng}&key=${
    process.env.GOOGLE_STREET_VIEW_API_KEY as string
  }`;

  try {
    const response = await fetch(streetViewApiUrl);
    const body = (await response.json()) as StreetViewResponse;

    if (!response.ok) {
      console.warn(`API request failed with status ${response.status}`);
      return generateRandomPopularLocation(retryCount + 1);
    }

    if (body.status !== "OK") {
      console.warn("No Street View coverage, retrying...");
      return generateRandomPopularLocation(retryCount + 1);
    }

    return {
      lat: body.location?.lat ?? randomLat,
      lng: body.location?.lng ?? randomLng,
    };
  } catch (error) {
    console.error("Error with Street View API:", error);
    return generateRandomPopularLocation(retryCount + 1);
  }
};
export default generateRandomPopularLocation;
