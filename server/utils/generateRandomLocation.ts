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

const MAX_RETRIES = 5;

const generateRandomPopularLocation = async (
  retryCount = 0
): Promise<RandomLocationOutput | any> => {
  if (retryCount >= MAX_RETRIES) {
    console.warn("Max retries reached when generating location");
    return null;
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
      throw new Error(`API request failed with status ${response.status}`);
    }

    if (body.status !== "OK") {
      // Location doesn't have Street View coverage, try again
      return generateRandomPopularLocation(retryCount + 1);
    }

    // If the API returns adjusted coordinates, use those instead
    if (body.location) {
      return {
        lat: body.location.lat,
        lng: body.location.lng,
      };
    }

    // Otherwise use our generated coordinates
    return {
      lat: randomLat,
      lng: randomLng,
    };
  } catch (error) {
    console.error("Street View API error:", error);

    // On network errors, we might want to retry
    return generateRandomPopularLocation(retryCount + 1);
  }
};

export default generateRandomPopularLocation;
