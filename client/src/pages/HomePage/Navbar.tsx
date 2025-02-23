import { Button } from "@/components/ui/button";
import { Compass, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import UserDropdown from "@/components/Navbar/UserDropdown";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const { user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const handlePlayNow = () => {
    if (isAuthenticated) {
      navigate("/user-choice");
    } else {
      navigate("/new-user");
    }
  };

  const NavLinks = () => (
    <>
      <Link
        to="/"
        className="text-foreground/80 hover:text-primary transition-colors"
      >
        Home
      </Link>
      <Link
        to="/how-to-play"
        className="text-foreground/80 hover:text-primary transition-colors"
      >
        How to Play
      </Link>
      <Link
        to="/leaderboard"
        className="text-foreground/80 hover:text-primary transition-colors"
      >
        Leaderboard
      </Link>
      <Link
        to="/premium"
        className="text-foreground/80 hover:text-primary transition-colors"
      >
        Premium
      </Link>
      {isAuthenticated && (
        <Link
          to={`/analytics/${user?.id}`}
          className="text-foreground/80 hover:text-primary transition-colors"
        >
          Stats
        </Link>
      )}
    </>
  );

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Compass className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              GeoHunt
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center space-x-4">
            <UserDropdown />
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
