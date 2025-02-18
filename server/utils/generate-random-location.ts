import {
  PopularAreaEntry,
  popularAreas,
  PopularAreasMap,
} from "../locations/locations";

interface StreetViewResponse {
  status: string;
  location?: {
    lat: number;
    lng: number;
  };
}

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY as string;
const GOOGLE_MAPS_API_KEY_NEW = process.env.GOOGLE_MAPS_API_KEY_NEW as string;
const MAX_RETRIES = 100;
const RATE_LIMIT_DELAY = 5000; // 5 seconds in milliseconds

// Add a variable to track which API key to use
let useNewApiKey = false;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function generateRandomPopularLocation(
  continent: keyof PopularAreasMap = "random",
  country?: string,
  retryCount: number = 0
): Promise<{ lat: number; lng: number } | null> {
  if (retryCount >= MAX_RETRIES) {
    console.error("Maximum retry attempts reached");
    return null;
  }

  // If no continent specified or undefined, treat as random
  const selectedContinent =
    !continent || continent === "random"
      ? (
          Object.keys(popularAreas).filter((k) => k !== "random") as Array<
            keyof PopularAreasMap
          >
        )[Math.floor(Math.random() * (Object.keys(popularAreas).length - 1))]
      : continent;

  if (country === undefined) {
    country = "random";
  }

  // Validate if the continent exists in popularAreas
  if (!popularAreas[selectedContinent]) {
    console.error(`Invalid continent: ${selectedContinent}`);
    return null;
  }

  // Get all countries in the selected continent
  const countriesInContinent = popularAreas[selectedContinent];

  if (
    !Array.isArray(countriesInContinent) ||
    countriesInContinent.length === 0
  ) {
    console.error(`No countries found for continent: ${selectedContinent}`);
    return null;
  }

  // If no country specified, randomly select one from the continent
  let countryData: PopularAreaEntry;
  if (country && country !== "random") {
    const found = countriesInContinent.find(
      (entry: PopularAreaEntry) => entry.country === country
    );
    if (!found) {
      console.error(
        `No popular area data found for country: ${country} in continent: ${selectedContinent}`
      );
      return null;
    }
    countryData = found;
  } else {
    countryData =
      countriesInContinent[
        Math.floor(Math.random() * countriesInContinent.length)
      ];
  }

  // Randomly select an area from the country-specific data
  const selectedArea =
    countryData.areas[Math.floor(Math.random() * countryData.areas.length)];

  // Generate a random lat/lng within the selected bounding box
  const randomLat =
    Math.random() * (selectedArea.maxLat - selectedArea.minLat) +
    selectedArea.minLat;
  const randomLng =
    Math.random() * (selectedArea.maxLon - selectedArea.minLon) +
    selectedArea.minLon;

  if (!GOOGLE_MAPS_API_KEY || !GOOGLE_MAPS_API_KEY_NEW) {
    throw new Error("Google Maps API keys are not configured");
  }

  // Alternate between API keys
  const currentApiKey = useNewApiKey
    ? GOOGLE_MAPS_API_KEY_NEW
    : GOOGLE_MAPS_API_KEY;
  useNewApiKey = !useNewApiKey;

  // Validate using Street View API
  const streetViewApiUrl = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${randomLat},${randomLng}&key=${currentApiKey}`;

  try {
    const response = await fetch(streetViewApiUrl);

    // Handle rate limiting
    if (response.status === 429) {
      console.warn(
        "Rate limit reached, waiting for 5 seconds before retrying..."
      );
      await sleep(RATE_LIMIT_DELAY);
      return generateRandomPopularLocation(continent, country, retryCount); // Maintain retry count for rate limits
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
      return generateRandomPopularLocation(continent, country, retryCount); // Maintain retry count for rate limits
    }

    // On other network errors, retry with increment
    return generateRandomPopularLocation(continent, country, retryCount + 1);
  }
}
