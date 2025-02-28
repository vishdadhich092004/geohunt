import { Button } from "@/components/ui/button";
import { MapPin, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import geohuntdemo from "@/media/geohuntdemo.mp4";
const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsVisible(true);

    // Add video event listeners for debugging
    if (videoRef.current) {
      videoRef.current.addEventListener("error", (e) => {
        console.error("Video error:", e);
      });

      videoRef.current.addEventListener("loadeddata", () => {
        console.log("Video loaded successfully");
      });

      // Force play attempt
      const playVideo = async () => {
        try {
          await videoRef.current?.play();
          console.log("Video playing");
        } catch (error) {
          console.error("Video play error:", error);
        }
      };

      playVideo();
    }
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Floating badge */}
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 backdrop-blur-sm rounded-full mb-8 animate-pulse-slow hover:bg-primary/30 transition-colors cursor-pointer">
              <MapPin className="w-5 h-5 text-amber-400 mr-2" />
              <span className="text-sm font-medium text-amber-400">
                Join The Collaborative Geography Challenge
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
              Explore the World with{" "}
              <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent relative font-grapenuts">
                GeoHunt
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-ping"></span>
              </span>
            </h1>

            <p
              className="text-xl text-gray-200 mb-4 max-w-2xl mx-auto lg:mx-0 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
            >
              Play instantly with any username - no registration needed! Test
              your geography skills using visual clues.
            </p>

            <p
              className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
            >
              Team up with friends or compete individually. Multiple players can
              use the same username and contribute to a shared score.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 animate-fade-in-up lg:ml-20"
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
                variant="outline"
                className="bg-amber-400 hover:bg-amber-500 hover:text-black/90 border-white/20 text-black text-lg px-8 h-14 rounded-xl relative backdrop-blur-sm group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                Play Now
              </Button>
              <Button
                onClick={() => {
                  navigate("/demo");
                }}
                variant="outline"
                className="text-white border-white/20 hover:bg-white/10 text-lg px-8 h-14 rounded-xl relative backdrop-blur-sm group"
              >
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Video Demo Section */}
          <div
            className="relative mt-8 lg:mt-0 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "1000ms", animationFillMode: "forwards" }}
          >
            <div className="relative rounded-2xl overflow-hidden border-2 border-gray-800 shadow-2xl shadow-black/50 group">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-2xl"
                preload="auto"
                onError={(e) => console.error("Video error:", e)}
              >
                <source src={geohuntdemo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Video overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

              {/* Video controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white text-sm font-medium bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                  GeoHunt
                </div>
              </div>
            </div>

            {/* Caption */}
            <p className="text-gray-400 text-sm mt-3 text-center">
              Experience the thrill of exploring global landmarks and landscapes
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-amber-400/20 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div
          className="absolute top-20 right-10 w-24 h-24 bg-amber-400/30 rounded-full blur-[80px] animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </div>
  );
};

export default Hero;
