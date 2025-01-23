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
  console.log(filteredLocations);

  return (
    <div className="container mx-auto px-4 py-8 bg-transparent min-h-screen">
      <div className="max-w-4xl mx-auto">
        <LocationSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {searchTerm ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredLocations.map((location) => (
              <BGCard
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
            <h1 className="text-4xl font-bold text-center text-white mb-10">
              Explore Our World
            </h1>

            <section className="mb-12 text-white">
              <h2 className="text-2xl font-semibold mb-6">
                Continents Overview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {continents.map((continent) => (
                  <div
                    key={continent.keyword}
                    className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <BGCard
                      continent={continent.keyword}
                      country={""}
                      heading={continent.name}
                      desc={continent.desc}
                      staticImg={continent.staticImg}
                      dynamicImg={continent.dynamicImg}
                    />
                  </div>
                ))}
              </div>
            </section>

            {continents.map((continent) => (
              <section key={continent.keyword} className="mb-12 text-white">
                <h2 className="text-2xl font-semibold mb-6">
                  {continent.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {continent.countries.map((country) => (
                    <div
                      key={country.keyword}
                      className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      <BGCard
                        heading={country.name}
                        continent={continent.keyword}
                        country={country.keyword}
                        desc={country.desc}
                        dynamicImg="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZW5mNDE1dHpmdmoxcGJscGJ2cjduemRmbTNnMjl4aTEzOXhjYWpxayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlGs7u3G9dkQ8DK/giphy.gif"
                        staticImg="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b"
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
