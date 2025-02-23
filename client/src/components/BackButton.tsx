import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  return (
    <Button variant="ghost" onClick={() => navigate(-1)}>
      <ArrowLeft className="h-6 w-6 text-amber-400" />
    </Button>
  );
}

export default BackButton;
