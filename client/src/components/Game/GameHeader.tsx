import HintButton from "@/components/Hints/HintButton";
import LocationNotLoadedButton from "@/components/Locations/LocationNotLoadedButton";
import ExitGame from "@/components/Game/ExitGame";
import GameScore from "@/components/Game/GameScore";
import GameLives from "@/components/Game/GameLives";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

interface GameHeaderProps {
  score: number;
  lives: number;
  currentRoundLocation: {
    latitude: number;
    longitude: number;
  };
}

function GameHeader({ score, lives, currentRoundLocation }: GameHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-1.5 sm:p-2 md:p-4">
      <div className="mx-auto max-w-4xl bg-zinc-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-zinc-800/50 transition-all duration-300 hover:border-zinc-700/50">
        <div className="flex items-center justify-between p-1.5 sm:p-2 md:p-3">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
            <GameLives lives={lives} />
            <GameScore score={score} />
            <HintButton
              lat={currentRoundLocation.latitude}
              lng={currentRoundLocation.longitude}
            />
          </div>

          {/* Mobile Menu */}
          <div className="sm:hidden">
            <DropdownMenu
              open={isDropdownOpen}
              onOpenChange={setIsDropdownOpen}
            >
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="p-1.5 hover:bg-zinc-800/50 rounded-lg transition-colors">
                  <MoreVertical className="h-5 w-5 text-zinc-400" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-zinc-900/95 border-zinc-800">
                <DropdownMenuItem
                  className="focus:bg-zinc-800"
                  onSelect={(e) => e.preventDefault()}
                >
                  <LocationNotLoadedButton />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="focus:bg-zinc-800"
                  onSelect={(e) => e.preventDefault()}
                >
                  <ExitGame />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <LocationNotLoadedButton />
            <ExitGame />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameHeader;
