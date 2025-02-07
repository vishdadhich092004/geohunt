import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface BGCardProps {
  heading: string;
  desc: string;
  staticImg: string;
  dynamicImg: string;
  continent?: string;
  country?: string;
  children?: React.ReactNode;
}
export function BGCard({
  heading,
  desc,
  staticImg,
  dynamicImg,
  continent,
  country,
  children,
}: BGCardProps) {
  const navigate = useNavigate();
  const handleLocationSelection = (continent?: string, country?: string) => {
    navigate(`/games?continent=${continent}&country=${country}`);
  };
  return (
    <div
      className="max-w-xs w-full"
      onClick={() => handleLocationSelection(continent, country)}
    >
      <div
        style={{
          backgroundImage: `url(${staticImg})`,
          backgroundSize: "cover",
        }}
        className={cn(
          "group w-full cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
          "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
          "transition-all duration-500"
        )}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundImage = `url(${dynamicImg})`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundImage = `url(${staticImg})`;
        }}
      >
        <div className="text relative z-50">
          <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
            {heading}
          </h1>
          <p className="font-normal text-base text-gray-50 relative my-4">
            {desc}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}
