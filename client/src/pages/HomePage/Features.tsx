import FeatureCard from "@/components/ui/feature-card";
import { Globe2, MapPin, Trophy, Users2 } from "lucide-react";

const features = [
  {
    icon: <Globe2 className="w-10 h-10" />,
    title: "Global Exploration",
    description:
      "Journey through carefully curated locations worldwide, from iconic landmarks to hidden gems, all powered by high-quality Street View imagery.",
  },
  {
    icon: <Users2 className="w-10 h-10" />,
    title: "Collaborative Play",
    description:
      "Play solo or team up using shared usernames! Multiple players can contribute to the same username's score, creating a unique collaborative experience.",
  },
  {
    icon: <MapPin className="w-10 h-10" />,
    title: "AI-Powered Hints",
    description:
      "Stuck on a location? Get intelligent hints about landmarks, cultural elements, and geographical features from our AI assistant.",
  },
  {
    icon: <Trophy className="w-10 h-10" />,
    title: "Competitive Rankings",
    description:
      "Compare scores across different usernames and see which community of players achieves the highest collective score.",
  },
];

export function Features() {
  return (
    <div className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              GeoHunt
            </span>
            ?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover what makes GeoHunt the most engaging geography game
            platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
