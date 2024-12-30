import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
export function CTA() {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const handlePlayNow = () => {
    if (isAuthenticated) navigate("/games");
    else navigate("/new-user");
  };
  return (
    <div className="relative py-24 overflow-hidden">
      {" "}
      <div className="absolute inset-0 bg-primary/10" />{" "}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80")',
        }}
      />{" "}
      <div className="container mx-auto px-4 relative">
        {" "}
        <div className="max-w-3xl mx-auto text-center">
          {" "}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            {" "}
            Ready to Start Your{" "}
            <span className="block bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              {" "}
              Geographic Adventure?{" "}
            </span>{" "}
          </h2>{" "}
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in delay-100">
            {" "}
            Join thousands of players worldwide in the ultimate geography
            guessing game. Start playing for free today!{" "}
          </p>{" "}
          <Button
            onClick={handlePlayNow}
            size="lg"
            className="animate-fade-in delay-200 group"
          >
            {" "}
            Start Playing Free{" "}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />{" "}
          </Button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
