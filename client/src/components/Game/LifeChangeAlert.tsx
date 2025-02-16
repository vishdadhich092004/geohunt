import { HeartCrackIcon } from "lucide-react";
import { HeartIcon } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

function LifeChangeAlert({ lifeChangeType }: { lifeChangeType: string }) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-5 duration-800">
      <Alert
        className={`max-w-md w-full ${
          lifeChangeType === "increase"
            ? "bg-green-950/80 border-green-500/50"
            : "bg-red-950/80 border-red-500/50"
        } text-white backdrop-blur-md shadow-lg hover:scale-102 transition-all`}
      >
        <div className="flex items-center gap-3">
          {lifeChangeType === "increase" ? (
            <HeartIcon className="h-5 w-5 text-green-400 animate-pulse" />
          ) : (
            <HeartCrackIcon className="h-5 w-5 text-red-400 animate-bounce" />
          )}
          <AlertTitle className="text-xl font-bold">
            {lifeChangeType === "increase" ? "Life Gained!" : "Life Lost!"}
          </AlertTitle>
        </div>
        <AlertDescription className="mt-3 text-sm opacity-90 pl-8">
          {lifeChangeType === "increase"
            ? "Great job! You've earned an extra life!"
            : "Be careful! You lost a life."}
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default LifeChangeAlert;
