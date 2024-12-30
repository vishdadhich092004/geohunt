import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapControlsProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export function MapControls({ isExpanded, onToggle }: MapControlsProps) {
  return (
    <Button
      variant="secondary"
      size="icon"
      className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
      onClick={onToggle}
      title={isExpanded ? "Minimize map" : "Maximize map"}
    >
      {isExpanded ? (
        <Minimize2 className="h-4 w-4" />
      ) : (
        <Maximize2 className="h-4 w-4" />
      )}
    </Button>
  );
}
