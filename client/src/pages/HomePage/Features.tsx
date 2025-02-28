import { Globe2, MapPin, Trophy, Users2, Brain, Compass } from "lucide-react";
import { useRef, useEffect, useState } from "react";

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
    icon: <Brain className="w-10 h-10" />,
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
  {
    icon: <Compass className="w-10 h-10" />,
    title: "Diverse Challenges",
    description:
      "Face a variety of challenges from urban landscapes to remote natural wonders, testing different aspects of your geographical knowledge.",
  },
  {
    icon: <MapPin className="w-10 h-10" />,
    title: "Precision Scoring",
    description:
      "Earn points based on how close your guess is to the actual location. The more precise your pin placement, the higher your score.",
  },
];

const FeatureCard = ({
  icon,
  title,
  description,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  inView: boolean;
}) => {
  return (
    <div
      className={`relative group p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-primary/30 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1 opacity-0 animate-fade-in`}
      style={{
        animationDelay: `${index * 100 + 200}ms`,
        animationFillMode: "forwards",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="mb-4 text-primary group-hover:text-primary/90 transition-colors duration-300 transform group-hover:scale-110 origin-left">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
        <p className="text-white/60 group-hover:text-white/80 transition-colors duration-300">
          {description}
        </p>
      </div>

      <div className="absolute bottom-3 right-3 w-12 h-12 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

const Features = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="py-24 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#232323_1px,transparent_1px),linear-gradient(to_bottom,#232323_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow" />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-2 bg-white/5 px-6 py-2 rounded-2xl backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 mb-4">
            <Compass className="w-5 h-5 text-primary" />
            <span className="text-white/80 font-medium">Features</span>
          </div>

          <h2
            className="text-3xl md:text-4xl font-bold mb-4 opacity-0 animate-fade-in"
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              GeoHunt
            </span>
            ?
          </h2>
          <p
            className="text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            Discover what makes GeoHunt the most engaging geography game
            platform for explorers of all skill levels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
