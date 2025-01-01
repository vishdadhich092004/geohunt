import { FlowChart } from "@/components/HowToPlay/FlowChart";
import { MessageCircleQuestion } from "lucide-react";

export default function HowToPlayPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <MessageCircleQuestion className="w-5 h-5 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Game Guide</span>
          </div>

          <h1 className="text-4xl font-bold mb-4">
            How to Play{" "}
            <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              GeoHunt
            </span>
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow these simple steps to start your geographic adventure and
            test your knowledge of locations around the world.
          </p>
        </div>

        <FlowChart />
      </div>
    </div>
  );
}