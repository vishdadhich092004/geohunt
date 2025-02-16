import {
  Users,
  MapPin,
  Globe,
  Trophy,
  ArrowLeft,
  Compass,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function LearnMore() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="w-5 h-5" />,
      title: "Team Formation",
      description:
        "Create or join a team with a shared username that connects all members.",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Global Play",
      description:
        "Play from anywhere, anytime - your scores contribute to the team total.",
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      title: "Shared Success",
      description:
        "Climb the leaderboard together as every member's score counts.",
    },
    {
      icon: <Compass className="w-5 h-5" />,
      title: "Collaborative Learning",
      description:
        "Share knowledge and strategies to improve team performance.",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Lives System",
      description:
        "Start with 5 lives and play strategically - each incorrect guess costs one life.",
    },
  ];

  const steps = [
    "Choose a unique team name that represents your group",
    "Share your team credentials with friends and family",
    "Each member plays independently using the shared account",
    "Individual scores automatically add to the team total",
    "Track your team's progress on the global leaderboard",
  ];

  return (
    <div className="relative min-h-screen bg-background">
      {/* Dynamic Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-background backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-16">
        {/* Navigation */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8 text-white/80 hover:text-white group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6 group hover:bg-primary/20 transition-colors duration-300">
            <MapPin className="w-5 h-5 text-primary mr-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-primary">
              Team Play Feature
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Play Together, Win Together
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Transform your GeoHunt experience with collaborative gameplay
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start mb-10">
          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:border-primary/30 transition-all duration-300"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <div className="text-primary">{feature.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Quick Start Guide */}
          <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-primary/20">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-primary/10 rounded-full mr-3">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Quick Start Guide
                </h2>
                <p className="text-sm text-white/60">
                  Follow these simple steps to begin
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm group-hover:bg-primary/30 transition-colors">
                    {index + 1}
                  </span>
                  <p className="text-gray-200 text-sm pt-1.5">{step}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate("/new-user")}
                className="flex-1 bg-primary hover:bg-primary/90 text-white font-medium"
              >
                Start Playing Now
              </Button>
              <Button
                onClick={() => navigate("/leaderboard")}
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10"
              >
                View Leaderboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
