import HintButton from "@/components/Hints/HintButton";
import LocationNotLoadedButton from "@/components/Locations/LocationNotLoadedButton";
import ExitGame from "@/components/Game/ExitGame";
import GameScore from "@/components/Game/GameScore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

interface GameHeaderProps {
  score: number;
  currentRoundLocation: {
    latitude: number;
    longitude: number;
  };
}

function GameHeader({ score, currentRoundLocation }: GameHeaderProps) {
  return (
    <div className="absolute top-4 z-10 w-full px-4">
      <div className="mx-auto max-w-6xl bg-zinc-900/90 rounded-lg shadow-xl border border-zinc-800">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-4">
            <GameScore score={score} />
            <HintButton
              lat={currentRoundLocation.latitude}
              lng={currentRoundLocation.longitude}
            />
          </div>
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <MoreVertical className="h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <LocationNotLoadedButton />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ExitGame />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="hidden md:flex gap-4">
            <LocationNotLoadedButton />
            <ExitGame />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameHeader;
