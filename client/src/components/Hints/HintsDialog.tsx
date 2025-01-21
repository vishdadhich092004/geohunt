import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Sparkles, LoaderCircle } from "lucide-react";
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
          className="relative flex items-center gap-3 px-6 py-3 text-lg font-semibold text-zinc-900 
                     bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 
                     hover:from-amber-500 hover:via-amber-600 hover:to-amber-700
                     rounded-lg shadow-lg hover:shadow-amber-500/20
                     hover:scale-105 active:scale-95 transition-all duration-300
                     disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={hasHintsForLocation ? undefined : handleFetchHints}
          disabled={isLoading}
        >
          <span>
            <Sparkles className="h-6 w-6" />
          </span>
          <span className="hidden sm:inline">
            {hasHintsForLocation ? "View Hints" : "Ask AI"}
          </span>
          <span className="sm:hidden">Hints</span>
          {isLoading && <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900/95 border border-zinc-800 backdrop-blur-md shadow-xl max-w-md w-[90vw] md:w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Location Hints
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Use these hints to help pinpoint the correct location. Each hint
            provides additional clues!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {error ? (
            <div className="bg-red-900/20 border border-red-500/20 text-red-400 p-4 rounded-lg">
              {error}
              <Button
                onClick={handleFetchHints}
                className="mt-3 w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40"
              >
                Try Again
              </Button>
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center p-8">
              <LoaderCircle className="h-8 w-8 animate-spin text-amber-400" />
            </div>
          ) : hints.length > 0 ? (
            <div className="space-y-3">
              {hints.map((hint, index) => (
                <div
                  key={index}
                  className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50 backdrop-blur-sm
                           hover:bg-zinc-800/70 transition-colors duration-200"
                >
                  <span className="font-semibold text-amber-400">
                    Hint {index + 1}:
                  </span>{" "}
                  <span className="text-zinc-300">{hint}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-zinc-400 p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/30">
              No hints available yet. Click the button to get started!
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default HintsDialog;
