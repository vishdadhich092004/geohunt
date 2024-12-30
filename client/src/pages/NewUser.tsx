import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { newUser } from "@/api-clients";
import { useToast } from "@/hooks/use-toast";
import { UserForm, UserFormData } from "@/components/UserForm";
import { ErrorAlert } from "@/components/ErrorAlert";

export default function NewUser() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation(newUser, {
    onSuccess: () => {
      toast({
        title: "Welcome to GeoHunt!",
        description: "Your account has been created successfully.",
      });
      navigate("/games");
    },
    onError: (err) => {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while creating your account."
      );
    },
  });

  const handleSubmit = (data: UserFormData) => {
    setError(null);
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {error && <ErrorAlert message={error} />}
        <UserForm onSubmit={handleSubmit} isLoading={mutation.isLoading} />
      </div>
    </div>
  );
}
