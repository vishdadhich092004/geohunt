import { Input } from "./ui/input";

interface LocationSearchProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
function LocationSearch({ searchTerm, setSearchTerm }: LocationSearchProps) {
  return (
    <Input
      type="text"
      placeholder="Search continents or countries..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-3 m-3 "
    />
  );
}

export default LocationSearch;
