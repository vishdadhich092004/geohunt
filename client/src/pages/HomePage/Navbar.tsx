import { Button } from "@/components/ui/button";
import { Compass, Menu, Sparkles, ChevronRight } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import UserDropdown from "@/components/Navbar/UserDropdown";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";

export function Navbar() {
  const { user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handlePlayNow = () => {
    if (isAuthenticated) {
      navigate("/user-choice");
    } else {
      navigate("/new-user");
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const NavLinks = ({ mobile = false }) => (
    <>
      <Link
        to="/"
        className={`${
          isActive("/")
            ? "text-primary font-medium"
            : "text-foreground/70 hover:text-primary"
        } transition-colors relative group ${mobile ? "text-lg py-2" : ""}`}
      >
        Home
        {isActive("/") && (
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
        )}
        {!isActive("/") && (
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full group-hover:w-full transition-all duration-300" />
        )}
      </Link>
      <Link
        to="/how-to-play"
        className={`${
          isActive("/how-to-play")
            ? "text-primary font-medium"
            : "text-foreground/70 hover:text-primary"
        } transition-colors relative group ${mobile ? "text-lg py-2" : ""}`}
      >
        How to Play
        {isActive("/how-to-play") && (
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
        )}
        {!isActive("/how-to-play") && (
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full group-hover:w-full transition-all duration-300" />
        )}
      </Link>
      <Link
        to="/leaderboard"
        className={`${
          isActive("/leaderboard")
            ? "text-primary font-medium"
            : "text-foreground/70 hover:text-primary"
        } transition-colors relative group ${mobile ? "text-lg py-2" : ""}`}
      >
        Leaderboard
        {isActive("/leaderboard") && (
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
        )}
        {!isActive("/leaderboard") && (
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full group-hover:w-full transition-all duration-300" />
        )}
      </Link>
      <Link
        to="/premium"
        className={`${
          isActive("/premium")
            ? "text-primary font-medium"
            : "text-foreground/70 hover:text-primary"
        } transition-colors relative group ${mobile ? "text-lg py-2" : ""}`}
      >
        <div className="flex items-center">
          Premium
          <Sparkles className="h-4 w-4 ml-1 text-yellow-400" />
        </div>
        {isActive("/premium") && (
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
        )}
        {!isActive("/premium") && (
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full group-hover:w-full transition-all duration-300" />
        )}
      </Link>
      {isAuthenticated && (
        <Link
          to={`/analytics/${user?.id}`}
          className={`${
            isActive(`/analytics/${user?.id}`)
              ? "text-primary font-medium"
              : "text-foreground/70 hover:text-primary"
          } transition-colors relative group ${mobile ? "text-lg py-2" : ""}`}
        >
          Stats
          {isActive(`/analytics/${user?.id}`) && (
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
          )}
          {!isActive(`/analytics/${user?.id}`) && (
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full group-hover:w-full transition-all duration-300" />
          )}
        </Link>
      )}
    </>
  );

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-lg shadow-lg shadow-black/10 border-b border-white/5"
          : "bg-background/70 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Compass className="h-8 w-8 text-primary transition-transform group-hover:rotate-45 duration-500" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent relative">
              GeoHunt
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping opacity-75" />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>

          <div className="flex items-center space-x-3">
            <UserDropdown />
            <Button
              onClick={handlePlayNow}
              className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all group"
            >
              Play Now
              <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-1">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] border-l border-white/10 bg-background/95 backdrop-blur-xl"
                >
                  <div className="flex flex-col space-y-6 mt-8">
                    <div className="flex items-center space-x-2 mb-6">
                      <Compass className="h-8 w-8 text-primary" />
                      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                        GeoHunt
                      </span>
                    </div>
                    <div className="flex flex-col space-y-4">
                      <NavLinks mobile={true} />
                    </div>
                    <div className="pt-6 mt-6 border-t border-white/10">
                      <Button
                        onClick={handlePlayNow}
                        className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                      >
                        Play Now
                        <ChevronRight className="ml-1 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
