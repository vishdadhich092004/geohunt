import { fetchHints } from "@/api-clients";
import { useState } from "react";
import { useMutation } from "react-query";
import { Button } from "./ui/button";

function HintButton({ lat, lng }: { lat?: number; lng?: number }) {
  const [hints, setHints] = useState<string[]>([]);

  const hintMutation = useMutation(() => fetchHints(lat, lng), {
    onSuccess: (data) => {
      setHints(data);
      console.log("Fetched Hints:", data);
    },
    onError: (error) => {
      console.error("Error fetching hints:", error);
    },
  });

  const handleHint = (data) => {
    hintMutation.mutate(data);
  };

  return (
    <Button variant={"default"} onClick={handleHint}>
      Hint
    </Button>
  );
}

export default HintButton;
