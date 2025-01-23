import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { LogOut } from "lucide-react";

interface ExitGameProps {
  className?: string;
}
function ExitGame({ className }: ExitGameProps) {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleExitGame = () => {
    navigate("/");
  };
  const handleCancelExit = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-zinc-800/50 border-zinc-700/50 text-white hover:bg-zinc-700/50 hover:border-zinc-600/50 backdrop-blur-sm transition-all duration-300"
        >
          <LogOut className="h-4 w-4 mr-2 text-amber-400" />
          <span className="hidden sm:inline">Exit Game</span>
          <span className="sm:hidden">Exit</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900/95 border border-zinc-800 backdrop-blur-md shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Wait, Why Exit?
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-4 text-zinc-300">
            Maintain a streak of accurate guesses and compete with others.
            <span className="flex gap-2">
              <Button
                variant="default"
                className={`bg-amber-500 hover:bg-amber-600 text-zinc-900 font-medium w-fit ${className}`}
                onClick={handleCancelExit}
              >
                Continue Playing
              </Button>
              <Button
                variant="destructive"
                // className="bg-amber-500 hover:bg-amber-600 text-zinc-900 font-medium w-fit"
                onClick={handleExitGame}
              >
                Exit
              </Button>
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
export default ExitGame;
