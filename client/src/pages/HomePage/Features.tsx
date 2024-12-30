import { Card, CardContent } from "@/components/ui/card";
import { Globe2, MapPin, Trophy, Users2 } from "lucide-react";

const features = [
  {
    icon: <Globe2 className="w-10 h-10" />,
    title: "Global Coverage",
    description:
      "Explore locations from every corner of the world, from bustling cities to remote landscapes.",
  },
  {
    icon: <Users2 className="w-10 h-10" />,
    title: "Multiplayer Modes",
    description:
      "Challenge friends in real-time multiplayer games or compete in global leaderboards.",
  },
  {
    icon: <MapPin className="w-10 h-10" />,
    title: "Custom Maps",
    description:
      "Create and share your own custom maps with specific regions or themes.",
  },
  {
    icon: <Trophy className="w-10 h-10" />,
    title: "Daily Challenges",
    description:
      "New daily challenges with unique locations and special rewards.",
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

function FeatureCard({
  icon,
  title,
  description,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <Card
      className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group animate-fade-in-up"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <CardContent className="pt-6">
        <div className="mb-4 text-primary transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
