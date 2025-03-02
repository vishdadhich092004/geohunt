import { Search, X } from "lucide-react";
import { Input } from "../ui/input";

interface LocationSearchProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

function LocationSearch({ searchTerm, setSearchTerm }: LocationSearchProps) {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/15 focus-within:bg-white/15 focus-within:border-white/30 focus-within:ring-2 focus-within:ring-white/10">
        <Search className="mr-3 text-white/70" />
        <Input
          type="text"
          placeholder="Search continents or countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent text-white border-none focus:outline-none w-full placeholder-white/50 focus:ring-0"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export default LocationSearch;
