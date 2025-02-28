import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="mb-4 hover:bg-amber-400 transition-colors"
      onClick={() => navigate(-1)}
    >
      <ChevronLeft className="mr-2 h-4 w-4" />
      Back
    </Button>
  );
}
