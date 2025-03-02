import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      size="sm"
      className="hover:bg-primary/10 transition-colors text-primary"
      onClick={() => navigate(-1)}
    >
      <ChevronLeft className="mr-2 h-4 w-4 text-primary" />
      Back
    </Button>
  );
}
