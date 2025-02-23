import { Button } from "../../components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
function IntermediateUserChoice() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <div className="p-8 rounded-2xl shadow-lg backdrop-blur-sm bg-background/50 border border-primary/10 max-w-md w-full transition-all duration-300 hover:shadow-primary/5">
        <div className="flex flex-col gap-8 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Welcome back,{" "}
              <span className="text-primary bg-primary/10 px-2 py-1 rounded-md">
                {user?.username}
              </span>
            </h1>
            <h3 className="text-lg text-gray-300/90">
              Would you like to continue with this team?
            </h3>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <Button
              className="w-full py-6 text-lg font-medium transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20"
              onClick={() => navigate("/game-select")}
            >
              Hunt with this team
            </Button>
            <Button
              variant="outline"
              className="w-full py-6 text-lg font-medium transition-all hover:bg-primary/10 hover:border-primary/50"
              onClick={() => navigate("/new-user")}
            >
              Switch Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntermediateUserChoice;
