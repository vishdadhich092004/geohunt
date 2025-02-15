import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { CloudAlert } from "lucide-react";

function LocationNotLoadedButton() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleLoadNewGame = () => {
    navigate("/locations");
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-zinc-800/50 border-zinc-700/50 text-white hover:bg-zinc-700/50 hover:border-zinc-600/50 backdrop-blur-sm transition-all duration-300"
        >
          <CloudAlert className="h-4 w-4 mr-2 text-amber-400" />
          <span className="hidden sm:inline">Facing Issues?</span>
          <span className="sm:hidden">Issues</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900/95 border border-zinc-800 backdrop-blur-md shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Location Not Loaded?
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-4 text-zinc-300">
            Sorry for the loss in the game. We are dependent on Google Street
            View.
            <Button
              variant="default"
              className="bg-amber-500 hover:bg-amber-600 text-zinc-900 font-medium w-fit"
              onClick={handleLoadNewGame}
            >
              Start New Game
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
export default LocationNotLoadedButton;
