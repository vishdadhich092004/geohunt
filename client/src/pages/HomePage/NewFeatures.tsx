import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import {
  ArrowRight,
  GamepadIcon as GameController,
  Clock,
  Zap,
  Target,
  Skull,
  Timer,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function NewFeatures() {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const gameModes = [
    {
      id: "1",
      name: "Classic",
      description:
        "Traditional mode with 5 lives. Take your time and aim for accuracy!",
      maxLives: 5,
      timeLimit: 120,
      icon: <Target className="w-6 h-6 text-primary" />,
      emoji: "🎯",
      image:
        "https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=1171&auto=format&fit=crop",
    },
    {
      id: "2",
      name: "Blitz",
      description:
        "120 seconds to score as many points as possible! Quick thinking required!",
      maxLives: 3,
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      emoji: "⚡",
      image:
        "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: "3",
      name: "Time Attack",
      description:
        "3 minutes to achieve your highest score. Balance speed and accuracy!",
      maxLives: 3,
      icon: <Clock className="w-6 h-6 text-blue-400" />,
      emoji: "⏱️",
      image:
        "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?q=80&w=1176&auto=format&fit=crop",
    },
    {
      id: "4",
      name: "Hardcore",
      description: "One life, no time limit. One mistake and game over!",
      maxLives: 1,
      icon: <Skull className="w-6 h-6 text-red-500" />,
      emoji: "💀",
      image:
        "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=1074&auto=format&fit=crop",
    },
    {
      id: "5",
      name: "Speed Run",
      description:
        "5 locations, 2 minutes, 3 lives. How fast can you complete it?",
      maxLives: 3,
      icon: <Timer className="w-6 h-6 text-green-400" />,
      emoji: "🏃",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1170&auto=format&fit=crop",
    },
  ];

  const handleClick = () => {
    if (!isAuthenticated) {
      navigate("/new-user");
    } else {
      navigate("/user-choice");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 p-4 md:p-8 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#232323_1px,transparent_1px),linear-gradient(to_bottom,#232323_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="relative max-w-7xl mx-auto">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow" />

        {/* Header Section */}
        <div className="relative text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center space-x-2 bg-white/5 px-6 py-2 rounded-2xl backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 group">
            <GameController className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-white/80 font-medium">Game Modes</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Discover New Ways to Play
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Choose from five unique game modes, each offering a different
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
              onMouseEnter={() => setHoveredCard(mode.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-xl transition-opacity duration-500 ${
                  hoveredCard === mode.id ? "opacity-100" : "opacity-0"
                }`}
              />
              <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg hover:border-primary/30 transition-all duration-500 group-hover:transform group-hover:-translate-y-2 overflow-hidden">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img
                    src={mode.image || "/placeholder.svg"}
                    alt={mode.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 group-hover:border-primary/30 transition-all duration-300">
                      {mode.icon}
                    </div>
                    <h2 className="text-xl font-bold text-white drop-shadow-lg">
                      {mode.name}
                    </h2>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
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

                {/* Game stats badges */}
                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                  {mode.maxLives && (
                    <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-white/90 border border-white/10 flex items-center">
                      <span className="mr-1">❤️</span> {mode.maxLives}
                    </div>
                  )}
                  {mode.timeLimit && (
                    <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-white/90 border border-white/10 flex items-center">
                      <span className="mr-1">⏱️</span> {mode.timeLimit}s
                    </div>
                  )}
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

export default NewFeatures;
