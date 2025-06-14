import { useState, useEffect } from "react";
import { Globe2 } from "lucide-react";
import { motion } from "framer-motion";
import { BGCard } from "@/components/ui/background-card";
import { continents } from "@/utils/countries-data";
import LocationSearch from "@/components/Locations/LocationSearch";
import BackButton from "@/components/BackButton";

interface LocationSelectProps {
  setContinent: (continent: string) => void;
  setCountry: (country: string) => void;
  handleBack: () => void;
}

function LocationSelect({ setContinent, setCountry }: LocationSelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredLocations = continents
    .flatMap((continent) => [
      { ...continent, type: "continent" },
      ...continent.countries.map((country) => ({
        ...country,
        type: "country",
        country: country.keyword,
      })),
    ])
    .filter((location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-background relative max-w-screen mx-auto">
      <div
        className="fixed inset-0 z-0"
        style={{
          background:
            'linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', // Gradient overlay with the background image
          backgroundSize: "cover",
          backgroundPosition: "center",
          pointerEvents: "none",
          animation: "fadeIn 1s ease-in-out",
        }}
      />
      <div className="relative z-10">
        {/* Back Button - Always visible */}
        <div className="absolute top-8 left-4 z-50">
          <BackButton />
        </div>

        {/* Fixed Search Section */}

        {/* Hero Section - Only visible when not scrolled */}
        {!isScrolled && (
          <div className="relative h-[20vh] min-h-[200px] bg-gradient-to-br from-primary/10 via-primary/5 to-background">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/10" />
            </div>
            <div className="relative h-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-2"
              >
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Globe2 className="h-8 w-8 text-primary" />
                  <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                    Explore the World
                  </h1>
                </div>
                <p className="text-base text-muted-foreground max-w-2xl">
                  Discover amazing destinations across every continent. Your
                  next adventure awaits.
                </p>
              </motion.div>
            </div>
          </div>
        )}
        <motion.div
          initial={{ y: 0 }}
          animate={{
            y: isScrolled ? 0 : 0,
            position: isScrolled ? "fixed" : "relative",
            width: "100%",
            zIndex: 50,
          }}
          className="bg-background/80 backdrop-blur-sm border-b border-border"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LocationSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </motion.div>

        {/* Results Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {searchTerm ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
            >
              {filteredLocations.map((location, index) => (
                <motion.div
                  key={location.keyword}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded-xl overflow-hidden">
                    <BGCard
                      onClick={() => {
                        setContinent(
                          location.type === "continent"
                            ? location.keyword
                            : "continentName" in location
                            ? location.continentName
                            : location.keyword
                        );
                        setCountry(location.country);
                      }}
                      heading={location.name}
                      desc={
                        location.type === "country"
                          ? `Country in ${location.name}`
                          : location.desc
                      }
                      staticImg={
                        location.staticImg ||
                        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b"
                      }
                      dynamicImg={location.dynamicImg}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="space-y-12">
              {continents.map((continent, continentIndex) => (
                <motion.section
                  key={continent.keyword}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: continentIndex * 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Globe2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {continent.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {continent.desc}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {/* Render continent card first */}
                    <motion.div
                      key={continent.keyword}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="group"
                    >
                      <div className="relative transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded-xl overflow-hidden">
                        <BGCard
                          onClick={() => {
                            setContinent(continent.keyword);
                            setCountry("random");
                          }}
                          heading={continent.name}
                          desc={continent.desc}
                          staticImg={continent.staticImg}
                          dynamicImg={continent.dynamicImg}
                        />
                      </div>
                    </motion.div>

                    {/* Then render country cards */}
                    {continent.countries.map((country, index) => (
                      <motion.div
                        key={country.keyword}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group"
                      >
                        <div className="relative transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded-xl overflow-hidden">
                          <BGCard
                            onClick={() => {
                              setContinent(continent.keyword);
                              setCountry(country.keyword);
                            }}
                            heading={country.name}
                            desc={country.desc}
                            staticImg={country.staticImg}
                            dynamicImg={country.dynamicImg}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LocationSelect;
