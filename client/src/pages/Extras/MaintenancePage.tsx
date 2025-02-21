import { WrenchIcon, ClockIcon } from "lucide-react";

const MaintenancePage = () => {
  return (
    <div className="min-h-screen bg-[url(https://images.unsplash.com/photo-1595814433015-e6f5ce69614e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center p-4 relative before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-background/90 before:to-muted/80">
      <div className="max-w-2xl w-full space-y-8 text-center relative z-10">
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
              We will be back online by 2 AM IST on February 22nd, 2025. Thank
              you for your patience!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
