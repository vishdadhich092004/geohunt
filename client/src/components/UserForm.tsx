import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserCircle } from "lucide-react";
export interface UserFormData {
  username: string;
}

interface UserFormProps {
  onSubmit: (data: UserFormData) => void;
  isLoading: boolean;
}

export function UserForm({ onSubmit, isLoading }: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>();

  return (
    <Card className="w-full animate-fade-in-up">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <UserCircle className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">Which Username?</CardTitle>
        </div>
        <CardDescription>
          Choose a username that will represent you in the community
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Username must be less than 20 characters",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_-]+$/,
                  message:
                    "Username can only contain letters, numbers, underscores, and dashes",
                },
              })}
              className={errors.username ? "border-destructive" : ""}
            />
            {errors.username && (
              <p className="text-sm text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            <p>You can:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Create your own solo adventure</li>
              <li>Join existing teams (team features coming soon)</li>
              <li>Compete with top players worldwide</li>
            </ul>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                <span>Creating account...</span>
              </div>
            ) : (
              "Start Your Journey"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
