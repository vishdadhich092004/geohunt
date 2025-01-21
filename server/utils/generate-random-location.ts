interface RandomLocationOutput {
  lat: number;
  lng: number;
}

interface StreetViewResponse {
  status: string;
  location?: {
    lat: number;
    lng: number;
  };
}

const MAX_RETRIES = 50;
const RATE_LIMIT_DELAY = 5000; // 5 seconds in milliseconds

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to dynamically import popular area data based on the country
const getCountryPopularAreas = async (continent: string, country: string) => {
  try {
    const module = await import(`../locations/${continent}/${country}`);
    return module.popularAreas;
  } catch (error) {
    throw new Error(`Could not import popular areas for country: ${country}`);
  }
};

const generateRandomPopularLocation = async (
  continent: string,
  country: string,
  retryCount = 0
): Promise<RandomLocationOutput | null> => {
  if (retryCount >= MAX_RETRIES) {
    console.warn("Max retries reached when generating location");
    return null;
  }

  let popularAreas;
  try {
    // Dynamically load the country-specific areas
    popularAreas = await getCountryPopularAreas(continent, country);
  } catch (error) {
    console.error("Error loading country-specific data:", error);
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
  const streetViewApiUrl = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${randomLat},${randomLng}&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await fetch(streetViewApiUrl);

    // Handle rate limiting
    if (response.status === 429) {
      console.warn(
        "Rate limit reached, waiting for 5 seconds before retrying..."
      );
      await sleep(RATE_LIMIT_DELAY);
      return generateRandomPopularLocation(continent, country, retryCount); // Don't increment retry count for rate limits
    }

    const body = (await response.json()) as StreetViewResponse;

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    if (body.status !== "OK") {
      // Location doesn't have Street View coverage, try again
      return generateRandomPopularLocation(continent, country, retryCount + 1);
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

    // Check if the error is rate limiting related
    if (error instanceof Error && error.message.includes("429")) {
      console.warn(
        "Rate limit reached, waiting for 5 seconds before retrying..."
      );
      await sleep(RATE_LIMIT_DELAY);
      return generateRandomPopularLocation(continent, country, retryCount); // Don't increment retry count for rate limits
    }

    // On other network errors, retry with increment
    return generateRandomPopularLocation(continent, country, retryCount + 1);
  }
};

export default generateRandomPopularLocation;
