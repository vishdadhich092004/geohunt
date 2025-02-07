import { Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function LearnMore() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-background">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-8">
            <MapPin className="w-5 h-5 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Team Play</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            How it Works
          </h1>
        </div>

        {/* Updated Steps Section */}
        <div className="grid md:grid-cols-1 gap-8">
          {/* Info Panel */}
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-primary/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-primary mr-3" />
                <h2 className="text-2xl font-bold text-white">Quick Guide</h2>
              </div>
              <div className="space-y-4">
                {[
                  "Pick a team username",
                  "Share this username with your friends/family",
                  "Everyone plays using the same username",
                  "All scores contribute to your team's total",
                  "Compete on the leaderboard as a team",
                ].map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </span>
                    <p className="text-gray-200">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <Button
              onClick={() => navigate("/new-user")}
              className="bg-primary hover:bg-primary/90 text-lg px-8 mt-8 w-full"
            >
              Start Playing Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
