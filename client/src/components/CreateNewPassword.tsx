import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useMutation } from "react-query";
import { createNewPassword } from "@/api-clients";
import { toast } from "@/hooks/use-toast";

export interface PasswordData {
  password: string;
  confirmPassword?: string;
  userId: string;
}

function CreateNewPassword() {
  const passwordMutation = useMutation(createNewPassword, {
    onSuccess: () => {
      toast({
        title: "Password Created",
        description: "Welcome Back ",
      });
    },
    onError: () => {
      console.error("Issue while creating a password");
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordData>();

  const onSubmit = (data: PasswordData) => {
    passwordMutation.mutate(data);
  };

  return (
    <div className="flex flex-col space-y-4 max-w-md mx-auto p-6 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center">
        Seems Like You Are an Old User
      </h1>
      <h4 className="text-center text-gray-600">
        You don't have a password as of now.
      </h4>
      <h6 className="text-center text-gray-600">
        Create a password to secure your account.
      </h6>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter a password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Create Password
        </Button>
      </form>
    </div>
  );
}

export default CreateNewPassword;
