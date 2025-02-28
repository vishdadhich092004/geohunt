import { Button } from "@/components/ui/button";
import { MapPin, Info, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const [showNewFeature, setShowNewFeature] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80")',
          transform: isVisible ? "scale(1.05)" : "scale(1)",
          transition: "transform 10s ease-out",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background" />
      </div>

      {/* Animated grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#232323_1px,transparent_1px),linear-gradient(to_bottom,#232323_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

      <div className="relative z-10 container mx-auto px-4 text-center mt-16 py-12">
        {/* Floating badge */}
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 backdrop-blur-sm rounded-full mb-8 animate-pulse-slow hover:bg-primary/30 transition-colors cursor-pointer">
          <MapPin className="w-5 h-5 text-primary mr-2" />
          <span className="text-sm font-medium text-primary">
            Join The Collaborative Geography Challenge
          </span>
        </div>

        {/* New Feature Card */}
        <div
          className="hidden md:flex md:z-10 md:absolute md:top-4 md:right-4 md:bg-primary/20 md:backdrop-blur-sm md:rounded-lg md:p-3 md:cursor-pointer md:hover:bg-primary/30 md:transition-colors md:items-center md:gap-2 md:border md:border-primary/20 group"
          onClick={() => setShowNewFeature(!showNewFeature)}
        >
          <span className="text-white font-semibold flex items-center">
            <span className="inline-block w-3 h-3 bg-primary rounded-full mr-2 animate-ping-slow"></span>
            What's New?
          </span>
          <Info className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />

          {showNewFeature && (
            <div className="absolute right-0 bottom-full mb-2 w-72 p-4 bg-black/90 backdrop-blur-md rounded-lg text-left border border-primary/30 shadow-xl shadow-primary/20 animate-fade-in">
              <h3 className="text-primary font-bold mb-2 flex items-center">
                <span className="text-lg mr-2">🎮</span> Team Play Feature!
              </h3>
              <p className="text-gray-200 text-sm">
                Multiple players can now use the same username to contribute to
                a shared score on the leaderboard. Team up with friends for
                higher rankings!
              </p>
              <div className="absolute w-3 h-3 bg-black/90 rotate-45 right-4 -bottom-1.5 border-r border-b border-primary/30"></div>
            </div>
          )}
        </div>

        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          Explore the World with{" "}
          <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent relative">
            GeoHunt
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping"></span>
          </span>
        </h1>

        <p
          className="text-xl text-gray-200 mb-4 max-w-2xl mx-auto opacity-0 animate-fade-in-up"
          style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
        >
          Play instantly with any username - no registration needed! Test your
          geography skills using visual clues.
        </p>

        <p
          className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in-up"
          style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
        >
          Team up with friends or compete individually. Multiple players can use
          the same username and contribute to a shared score.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up"
          style={{ animationDelay: "800ms", animationFillMode: "forwards" }}
        >
          <Button
            onClick={() => {
              if (isAuthenticated) {
                navigate("/user-choice");
              } else {
                navigate("/new-user");
              }
            }}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-lg px-8 h-14 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all group"
          >
            <Play className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
            Play Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white/20 hover:bg-white/10 text-lg px-8 h-14 rounded-xl relative backdrop-blur-sm group"
            onClick={() => setShowComingSoon(true)}
            onMouseLeave={() => setShowComingSoon(false)}
          >
            Watch Demo
            {showComingSoon && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-4 py-2 rounded-lg whitespace-nowrap border border-primary/30 animate-fade-in">
                Coming Soon!
              </div>
            )}
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div
          className="absolute top-20 right-10 w-24 h-24 bg-primary/30 rounded-full blur-[80px] animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </div>
  );
};

export default Hero;
