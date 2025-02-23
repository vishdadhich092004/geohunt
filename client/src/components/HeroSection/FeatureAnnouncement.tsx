import { ArrowRight, TowerControl as GameController } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
function FeaturesAnnouncement() {
  const gameModes = [
    {
      id: "1",
      name: "Classic",
      description:
        "Traditional mode with 5 lives. Take your time and aim for accuracy!",
      maxLives: 5,
      timeLimit: 120,
      icon: "🎯",
    },
    {
      id: "2",
      name: "Blitz",
      description:
        "120 seconds to score as many points as possible! Quick thinking required!",
      maxLives: 3,
      icon: "⚡",
    },
    {
      id: "3",
      name: "Time Attack",
      description:
        "3 minutes to achieve your highest score. Balance speed and accuracy!",
      maxLives: 3,
      icon: "⏱️",
    },
    {
      id: "4",
      name: "Hardcore",
      description: "One life, no time limit. One mistake and game over!",
      maxLives: 1,
      icon: "💀",
    },
    {
      id: "5",
      name: "Speed Run",
      description:
        "5 locations, 2 minutes, 3 lives. How fast can you complete it?",
      maxLives: 3,
      icon: "🏃",
    },
    {
      id: "6",
      name: "Precision Master",
      description: "3 lives but need higher accuracy for points. For experts!",
      maxLives: 3,
      icon: "🎯",
    },
    {
      id: "7",
      name: "Practice",
      description:
        "Unlimited lives, hints enabled, and detailed feedback after each guess.",
      maxLives: null,
      icon: "🎮",
    },
  ];
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const handleClick = () => {
    if (isAuthenticated) {
      navigate("/user-choice");
    } else {
      navigate("/new-user");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 p-4 md:p-8">
      <div className="relative max-w-7xl mx-auto">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-slow delay-300" />

        {/* Header Section */}
        <div className="relative text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center space-x-2 bg-white/5 px-6 py-2 rounded-2xl backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 group">
            <GameController className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-white/80 font-medium">New Features</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Discover New Ways to Play
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Choose from seven unique game modes, each offering a different
            challenge to test your skills
          </p>
        </div>

        {/* Game Modes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameModes.map((mode, index) => (
            <div
              key={mode.id}
              className="group relative animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
              <div className="relative h-full p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg hover:border-primary/30 transition-all duration-500 group-hover:transform group-hover:-translate-y-1">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{mode.icon}</span>
                    <h2 className="text-xl font-bold text-white">
                      {mode.name}
                    </h2>
                  </div>

                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    {mode.description}
                  </p>

                  <Button
                    onClick={handleClick}
                    className="mt-auto group/btn flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-primary text-white font-medium px-4 py-3 rounded-xl transition-all duration-300"
                  >
                    <span>Start Playing</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-primary/5 rounded-full blur-[120px] -z-10" />
      </div>
    </div>
  );
}

export default FeaturesAnnouncement;
