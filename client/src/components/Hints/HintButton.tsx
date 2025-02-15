import { useState, useEffect, useRef } from "react";
import { fetchHints } from "@/api-clients";
import HintsDialog from "@/components/Hints/HintsDialog";

interface HintButtonProps {
  lat?: number;
  lng?: number;
}

interface LocationHints {
  [key: string]: string[];
}

const HintButton = ({ lat, lng }: HintButtonProps) => {
  const [hints, setHints] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Cache to store hints for each location
  const hintsCache = useRef<LocationHints>({});

  // Generate a unique key for current location
  const locationKey = `${lat}-${lng}`;

  // Initialize hints from cache when location changes
  useEffect(() => {
    if (lat && lng && hintsCache.current[locationKey]) {
      setHints(hintsCache.current[locationKey]);
    } else {
      setHints([]);
    }
  }, [lat, lng]);

  const handleFetchHints = async () => {
    if (!lat || !lng) {
      setError("Location coordinates are not available");
      return;
    }

    // If hints already exist for this location, don't fetch again
    if (hintsCache.current[locationKey]) {
      setHints(hintsCache.current[locationKey]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchHints(lat, lng);
      const newHints = response.data;
      // Cache the hints for this location
      hintsCache.current[locationKey] = newHints;
      setHints(newHints);
    } catch (err) {
      setError("Failed to fetch hints. Please try again.");
      console.error("Error fetching hints:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const hasHintsForLocation = Boolean(hintsCache.current[locationKey]);

  return (
    <HintsDialog
      error={error!}
      handleFetchHints={handleFetchHints}
      hasHintsForLocation={hasHintsForLocation}
      hints={hints}
      isDialogOpen={isDialogOpen}
      isLoading={isLoading}
      setIsDialogOpen={setIsDialogOpen}
    />
  );
};

export default HintButton;
