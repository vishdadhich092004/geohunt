import LocationSearch from "@/components/LocationSearch";
import { BGCard } from "@/components/ui/background-card";
import { continents } from "@/utils/countries-data";
import { useState } from "react";

function LocationSelect() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLocations = continents
    .flatMap((continent) => [
      { ...continent, type: "continent" },
      ...continent.countries.map((country) => ({
        ...country,
        type: "country",
        continentName: continent.keyword,
      })),
    ])
    .filter((location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 relative">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <img
          src="https://gtac.wustl.edu/wp-content/uploads/Beautiful-Earth-at-Night-HD-Wallpapers-for-Desktop.jpg"
          alt="Global map background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-center mb-10">
          Explore Our World
        </h1>
        <LocationSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {searchTerm ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6">
            {filteredLocations.map((location) => (
              <BGCard
                key={location.keyword}
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
                dynamicImg={
                  location.dynamicImg ||
                  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZW5mNDE1dHpmdmoxcGJscGJ2cjduemRmbTNnMjl4aTEzOXhjYWpxayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlGs7u3G9dkQ8DK/giphy.gif"
                }
              />
            ))}
          </div>
        ) : (
          <>
            {continents.map((continent) => (
              <section key={continent.keyword} className="mb-12">
                <h2 className="text-3xl font-semibold mb-6">
                  {continent.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  {continent.countries.map((country) => (
                    <div
                      key={country.keyword}
                      className="transform transition-all duration-300 hover:scale-105"
                    >
                      <BGCard
                        heading={country.name}
                        continent={continent.keyword}
                        country={country.keyword}
                        desc={country.desc}
                        staticImg={country.staticImg}
                        dynamicImg={country.dynamicImg}
                      />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default LocationSelect;
