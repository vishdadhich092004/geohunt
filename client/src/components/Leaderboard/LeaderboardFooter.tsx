import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface LeaderboardFooterProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function LeaderboardFooter({
  currentPage,
  totalPages,
  onPageChange,
}: LeaderboardFooterProps) {
  const generatePageNumbers = () => {
    const pages = [];
    const showPages = 5;

    let start = Math.max(1, currentPage - Math.floor(showPages / 2));
    const end = Math.min(totalPages, start + showPages - 1);

    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center gap-2 rounded-lg border bg-card/50 backdrop-blur-sm p-1 shadow-lg">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="h-8 w-8 rounded-md transition-all duration-200 hover:bg-primary/20"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 rounded-md transition-all duration-200 hover:bg-primary/20"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="hidden sm:flex items-center gap-1 px-1">
          {generatePageNumbers().map((pageNum) => (
            <Button
              key={pageNum}
              variant={pageNum === currentPage ? "default" : "ghost"}
              size="icon"
              onClick={() => onPageChange(pageNum)}
              className={`h-8 w-8 rounded-md transition-all duration-200 ${
                pageNum === currentPage
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-primary/20"
              }`}
            >
              {pageNum}
            </Button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 rounded-md transition-all duration-200 hover:bg-primary/20"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 rounded-md transition-all duration-200 hover:bg-primary/20"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
