import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function FeatureAnnouncement() {
  const navigate = useNavigate();
  const handleLearnMore = () => {
    navigate("/learn-more");
  };

  return (
    <div className="relative mx-4 my-6 mt-20">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-zinc-900/80 via-primary/5 to-zinc-900/80" />

      <div className="relative backdrop-blur-[2px] border border-white/5 rounded-lg overflow-hidden">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col items-center text-center">
            {/* Announcement Badge */}
            <div className="inline-flex items-center bg-white/5 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary/80 mr-2" />
              <span className="text-white/90 font-medium">New Feature</span>
            </div>

            {/* Title */}
            <div className="flex items-center justify-center mb-6">
              <h2 className="text-3xl font-bold text-white">
                Introducing <span className="text-primary">Team Play</span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Experience GeoHunt like never before! Now multiple players can use
              the same username to contribute to a shared score on the
              leaderboard.
              <span className="block mt-2 text-white/90">
                Team up with friends and dominate the rankings together.
              </span>
            </p>

            {/* CTA Button */}
            <Button
              onClick={handleLearnMore}
              className="bg-primary/90 hover:bg-primary text-white font-medium px-6 py-2 rounded-md transition-colors duration-200"
            >
              <div className="flex items-center">
                <span>Learn More</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
