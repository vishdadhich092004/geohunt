import { Button } from "../../components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function IntermediateUserChoice() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="flex flex-col gap-6 text-center">
          <h1 className="text-2xl font-bold text-white  ">
            Current User is{" "}
            <span className="text-primary">{user?.username}</span>
          </h1>
          <h3 className="text-lg text-gray-300">
            Do you want to continue with this user?
          </h3>
          <div className="flex flex-col gap-3 mt-2">
            <Button className="w-full" onClick={() => navigate("/locations")}>
              Continue
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/new-user")}
            >
              Change User
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntermediateUserChoice;
