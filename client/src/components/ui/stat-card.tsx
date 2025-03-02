import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
function StatCard({
  icon: Icon,
  value,
  label,
  className,
}: {
  icon: React.ElementType;
  value: string | number;
  label: string;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "transform transition-all duration-300 hover:scale-105",
        className
      )}
    >
      <CardContent className="pt-6 pb-6">
        <div className="flex flex-col items-center space-y-2">
          <Icon className="w-8 h-8 text-primary mb-2" />
          <div className="text-3xl font-bold">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StatCard;
