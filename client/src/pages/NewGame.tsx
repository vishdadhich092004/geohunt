import { useMutation } from "react-query";
import { useAuthContext } from "../contexts/AuthContext";
import { newGame } from "../api-clients";
import { useNavigate } from "react-router-dom";

function NewGame() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const mutation = useMutation(newGame, {
    onSuccess: (data) => {
      navigate(`/guesses/${data.id}`);
    },
    onError: () => {
      alert("An error occurred while creating the game.");
    },
  });

  const handleCreateGame = () => {
    mutation.mutate();
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">Create a New Game</h1>
      <h3 className="text-lg text-gray-700 mb-6">
        Hey {user?.username || "Guest"}!
      </h3>
      <button
        onClick={handleCreateGame}
        disabled={mutation.isLoading}
        className={`px-4 py-2 text-white rounded-md ${
          mutation.isLoading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {mutation.isLoading ? "Creating..." : "Start Game"}
      </button>
    </div>
  );
}

export default NewGame;
