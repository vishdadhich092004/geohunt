import { ArrowDown } from "lucide-react";
import { StepCard } from "./StepCard";
import { gameSteps } from "@/lib/constants/game-steps";

export function FlowChart() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {gameSteps.map((step, index) => (
        <div key={index} className="relative">
          <StepCard
            icon={step.icon}
            title={step.title}
            description={step.description}
            className="animate-fade-in-up"
          />
          {index < gameSteps.length - 1 && (
            <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 z-10">
              <ArrowDown className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
