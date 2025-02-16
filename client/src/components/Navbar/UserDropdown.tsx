import { useAuthContext } from "@/contexts/AuthContext";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function UserDropdown() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthContext();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Team
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isAuthenticated && (
          <DropdownMenuItem onClick={() => navigate(`/analytics/${user?.id}`)}>
            Stats
          </DropdownMenuItem>
        )}
        {isAuthenticated && (
          <DropdownMenuItem onClick={() => navigate("/new-user")}>
            Change Team
          </DropdownMenuItem>
        )}
        {!isAuthenticated && (
          <DropdownMenuItem onClick={() => navigate("/new-user")}>
            New User
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdown;
