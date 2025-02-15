import { WrenchIcon, ClockIcon } from "lucide-react";

const MaintenancePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="space-y-6">
          <div className="flex justify-center space-x-4">
            <WrenchIcon className="h-16 w-16 text-primary animate-bounce" />
            <ClockIcon className="h-16 w-16 text-primary animate-bounce delay-100" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Under Maintenance
          </h1>

          <p className="text-xl text-muted-foreground">
            We're currently updating our game to bring you an even better
            experience. Please check back soon!
          </p>

          <div className="bg-card rounded-lg p-6 shadow-lg border border-border">
            <h2 className="text-lg font-semibold mb-3">Expected Duration</h2>
            <p className="text-muted-foreground">
              We anticipate being back online within the next few hours. Thank
              you for your patience!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
