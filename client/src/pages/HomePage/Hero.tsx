import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center animate-ken-burns"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center mt-16">
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-8 animate-fade-in">
          <MapPin className="w-5 h-5 text-primary mr-2" />
          <span className="text-sm font-medium text-primary">
            Start your geographic adventure today
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up">
          Explore the World with{" "}
          <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            GeoHunt
          </span>
        </h1>

        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-100">
          Test your geography knowledge in this immersive game. Drop into random
          locations worldwide and guess where you are using visual clues and
          your intuition.
        </p>

        <div className="flex gap-4 justify-center animate-fade-in-up delay-200">
          <Button
            onClick={() => {
              navigate(`${isAuthenticated ? "/locations" : "/new-user"}`);
            }}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-lg px-8"
          >
            Play Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white hover:bg-white/10 text-lg px-8"
          >
            Watch Demo
          </Button>
        </div>
      </div>
    </div>
  );
}
