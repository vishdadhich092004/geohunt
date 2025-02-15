import { Sparkles, Users, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";

export function FeatureAnnouncement() {
  const { user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const handleLearnMore = () => {
    navigate("/learn-more");
  };
  const handleViewStats = () => {
    if (isAuthenticated) {
      navigate(`/analytics/${user?.id}`);
    } else {
      navigate("/new-user");
    }
  };

  return (
    <div className="relative mx-4 mb-3 ">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 rounded-lg bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)),
            url("https://plus.unsplash.com/premium_photo-1661311943117-c515634ea81d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
          `,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/95 via-black/80 to-primary/20 rounded-lg animate-gradient" />
      </div>

      <div className="relative border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm hover:border-white/20 transition-colors duration-500">
        <div className="container mx-auto px-4 py-6">
          {/* Animated Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-pulse-slow delay-300" />

          {/* Header Section */}
          <div className="text-center mb-6 space-y-2 animate-fade-in">
            <div className="inline-flex items-center bg-white/10 px-3 py-1.5 rounded-full mb-2 backdrop-blur-md hover:bg-white/15 transition-colors duration-300">
              <Sparkles className="w-3.5 h-3.5 text-primary mr-2 animate-pulse" />
              <span className="text-white/90 text-sm font-semibold">
                New Features
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white hover:scale-[1.01] transition-transform duration-300">
              Elevate Your GeoHunt Experience
            </h1>
            <p className="text-sm text-white/80 max-w-xl mx-auto">
              Two game-changing features to transform your gameplay
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Team Play Card */}
            <div className="group relative animate-slide-up">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-zinc-900/50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative p-4 rounded-lg border border-white/10 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 group-hover:translate-y-[-2px]">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="inline-flex items-center bg-white/5 px-2 py-1 rounded-full mb-2 group-hover:bg-white/10 transition-colors duration-300">
                      <Users className="w-3.5 h-3.5 text-primary mr-1.5 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-white/90 text-xs font-medium">
                        Team Play
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      Unite &{" "}
                      <span className="text-primary group-hover:text-white transition-colors duration-300">
                        Conquer
                      </span>
                    </h2>
                    <p className="text-sm text-gray-300 leading-relaxed mb-4">
                      Team up with friends under a shared username and climb the
                      leaderboard together.
                    </p>
                  </div>
                  <div className="mt-auto">
                    <Button
                      onClick={handleLearnMore}
                      className="group w-full bg-white/5 hover:bg-primary/90 text-white font-medium px-4 py-2 rounded-md transition-all duration-300 text-sm"
                    >
                      <span className="flex items-center justify-center">
                        Learn More
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Accuracy Tracking Card */}
            <div className="group relative animate-slide-up delay-150">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-zinc-900/50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative p-4 rounded-lg border border-white/10 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 group-hover:translate-y-[-2px]">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="inline-flex items-center bg-white/5 px-2 py-1 rounded-full mb-2 group-hover:bg-white/10 transition-colors duration-300">
                      <Target className="w-3.5 h-3.5 text-primary mr-1.5 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-white/90 text-xs font-medium">
                        Accuracy Tracking
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      Master Your{" "}
                      <span className="text-primary group-hover:text-white transition-colors duration-300">
                        Precision
                      </span>
                    </h2>
                    <p className="text-sm text-gray-300 leading-relaxed mb-4">
                      Track your performance metrics and watch your guessing
                      precision improve over time.
                    </p>
                  </div>
                  <div className="mt-auto">
                    <Button
                      onClick={handleViewStats}
                      className="group w-full bg-white/5 hover:bg-primary/90 text-white font-medium px-4 py-2 rounded-md transition-all duration-300 text-sm"
                    >
                      <span className="flex items-center justify-center">
                        View Stats
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
