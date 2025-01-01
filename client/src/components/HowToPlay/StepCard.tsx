import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StepCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function StepCard({
  icon: Icon,
  title,
  description,
  className,
}: StepCardProps) {
  return (
    <Card className={cn("relative", className)}>
      <CardContent className="pt-6">
        <div className="mb-2">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
