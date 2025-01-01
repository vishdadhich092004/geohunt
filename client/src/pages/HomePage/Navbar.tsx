import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const handlePlayNow = () => {
    if (isAuthenticated) navigate("/games");
    else navigate("/new-user");
  };
  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Compass className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              GeoHunt
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/how-to-play"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              How to Play
            </a>
            <a
              href="/leaderboard"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Leaderboard
            </a>
            <a
              href="#"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Premium
            </a>
          </div>

          <div className="flex items-center space-x-4">
            {!isAuthenticated && (
              <Button
                onClick={() => {
                  navigate("/new-user");
                }}
                variant="ghost"
                className="hidden md:inline-flex"
              >
                Sign In
              </Button>
            )}
            <Button
              onClick={handlePlayNow}
              className="bg-primary hover:bg-primary/90"
            >
              Play Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
