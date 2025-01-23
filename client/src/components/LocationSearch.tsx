import { Search, X } from "lucide-react";
import { Input } from "./ui/input";

interface LocationSearchProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

function LocationSearch({ searchTerm, setSearchTerm }: LocationSearchProps) {
  return (
    <div className="relative w-full mb-4">
      <div className="flex items-center bg-black border-b border-white/20 px-2 py-2">
        <Search className="mr-3 text-white" />
        <Input
          type="text"
          placeholder="Search continents or countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-black text-white border-none focus:outline-none w-full placeholder-white/50"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="text-white/70 hover:text-white"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

export default LocationSearch;
