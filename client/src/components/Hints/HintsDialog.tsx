import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Lightbulb, LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";
import { HintType } from "../../../../server/shared/types";

interface HintsDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (arg0: boolean) => void;
  isLoading: boolean;
  handleFetchHints: () => void;
  hasHintsForLocation: boolean;
  error: string;
  hints: HintType[];
}

function HintsDialog({
  isDialogOpen,
  setIsDialogOpen,
  isLoading,
  error,
  handleFetchHints,
  hasHintsForLocation,
  hints,
}: HintsDialogProps) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="relative flex items-center gap-3 px-6 py-3 text-lg font-semibold text-black bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 rounded-full shadow-lg hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300"
          onClick={hasHintsForLocation ? undefined : handleFetchHints}
          disabled={isLoading}
        >
          <span>
            <Lightbulb size={24} />
          </span>
          {hasHintsForLocation ? "View Hints" : "Get Hint"}
          {isLoading && <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Location Hints
          </DialogTitle>
          <DialogDescription>
            Use these hints to help pinpoint the correct location. Each hint
            provides additional clues!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {error ? (
            <div className="text-red-500 p-4 rounded-lg bg-red-50">
              {error}
              <Button
                onClick={handleFetchHints}
                className="mt-2 w-full bg-red-500 hover:bg-red-600"
              >
                Try Again
              </Button>
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center p-8">
              <LoaderCircle className="h-8 w-8 animate-spin text-green-600" />
            </div>
          ) : hints.length > 0 ? (
            <div className="space-y-3">
              {hints.map((hint, index) => (
                <div key={index} className="p-4 border border-white rounded-sm">
                  <span className="font-semibold text-white-700">
                    Hint {index + 1}:
                  </span>{" "}
                  {hint}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 p-4">
              No hints available yet. Click the button to get started!
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default HintsDialog;
