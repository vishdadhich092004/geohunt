import { useMutation } from "react-query";
import { useAuthContext } from "../contexts/AuthContext";
import { newGame } from "../api-clients";
import { useNavigate } from "react-router-dom";
import { GameType } from "../../../server/shared/types";
function NewGame() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const mutation = useMutation(newGame, {
    onSuccess: async (data) => {
      navigate(`/guesses/${data.id}`);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const handleCreateGame = (data: GameType) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <h1>Create a new Game</h1>
      <h3>Hey {user?.username}</h3>
      <button onClick={handleCreateGame}>Start Game </button>
    </div>
  );
}

export default NewGame;
