import { Search } from "lucide-react";
import { Input } from "./ui/input";

interface LocationSearchProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
function LocationSearch({ searchTerm, setSearchTerm }: LocationSearchProps) {
  return (
    <span className="flex p-3 m-3">
      <Search className="mr-3 mt-1" />
      <Input
        type="text"
        placeholder="Search continents or countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />
    </span>
  );
}

export default LocationSearch;
