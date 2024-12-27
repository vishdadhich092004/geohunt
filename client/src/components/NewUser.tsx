import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { newUser } from "../api-clients";
import { useNavigate } from "react-router-dom";
export type NewUserFormData = {
  username: string;
};
function NewUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewUserFormData>();
  const navigate = useNavigate();
  const mutation = useMutation(newUser, {
    onSuccess: () => {
      alert("Welcome to GeoHunt");
      navigate("/games");
    },
    onError: (error: Error) => {
      alert(error);
    },
  });
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <div>
      <h1>New User</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter Your Username"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && <span>{errors.username.message}</span>}
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}

export default NewUser;
