import { cn } from "@/lib/utils";

interface BGCardProps {
  heading: string;
  desc: string;
  staticImg: string;
  dynamicImg: string;
  children?: React.ReactNode;
  onClick?: () => void;
}
export function BGCard({
  heading,
  desc,
  staticImg,
  dynamicImg,
  children,
  onClick,
}: BGCardProps) {
  return (
    <div className="max-w-xs w-full" onClick={onClick}>
      {/* Hidden preload: fetches the GIF lazily so it's cached before first hover */}
      <img
        src={dynamicImg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="hidden"
      />
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
