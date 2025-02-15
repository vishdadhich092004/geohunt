import { Card, CardContent } from "./card";

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

export default FeatureCard;
