import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Hero() {
  const navigate = useNavigate();
  const [showNewFeature, setShowNewFeature] = useState(false);

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
            Join The Collaborative Geography Challenge
          </span>
        </div>

        {/* New Feature Card */}
        <div
          className="hidden md:z-10 md:absolute md:top-4 md:right-4 md:bg-primary/20 md:backdrop-blur-sm md:rounded-lg md:p-4 md:cursor-pointer md:hover:bg-primary/30 md:transition-colors md:animate-bounce"
          onClick={() => setShowNewFeature(!showNewFeature)}
        >
          {showNewFeature && (
            <div className="absolute right-0 bottom-full mb-2 w-64 p-4 bg-black/90 rounded-lg text-left">
              <h3 className="text-primary font-bold mb-2">
                Team Play Feature!
              </h3>
              <p className="text-gray-200 text-sm">
                Multiple players can now use the same username to contribute to
                a shared score on the leaderboard. Team up with friends for
                higher rankings!
              </p>
            </div>
          )}
          <span className="text-white font-semibold">🎉 What's New?</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up">
          Explore the World with{" "}
          <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            GeoHunt
          </span>
        </h1>

        <p className="text-xl text-gray-200 mb-4 max-w-2xl mx-auto animate-fade-in-up delay-100">
          Play instantly with any username - no registration needed! Test your
          geography skills using visual clues.
        </p>

        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-100">
          Team up with friends or compete individually. Multiple players can use
          the same username and contribute to a shared score.
        </p>

        <div className="flex gap-4 justify-center animate-fade-in-up delay-200">
          <Button
            onClick={() => {
              navigate("/new-user");
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
