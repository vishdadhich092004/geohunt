import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto rounded-xl overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  onClick,
  className,
  title,
  description,
  header,
  icon,
}: {
  onClick?: () => void;
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:scale-[1.02] hover:shadow-xl transition-all duration-200 backdrop-blur-sm bg-black/60 border border-gray-800 justify-between flex flex-col space-y-4 overflow-hidden cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200 p-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-gray-800 text-amber-400">
            {icon}
          </div>
          <div className="font-sans font-bold text-amber-400 text-lg">
            {title}
          </div>
        </div>
        <div className="font-sans font-normal text-gray-300 text-sm mt-2">
          {description}
        </div>
      </div>
    </div>
  );
};
