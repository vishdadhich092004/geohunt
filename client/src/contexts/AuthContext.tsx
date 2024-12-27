import { createContext, useContext } from "react";
import { useQuery } from "react-query";
import { validateToken } from "../api-clients";
type User = {
  id: string;
  username: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  refetchUser: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Auth Provider is absent");
  }
  return context;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { data, refetch } = useQuery("validate-token", validateToken, {
    retry: false,
  });
  const user = data?.user || null;
  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, refetchUser: refetch }}
    >
      {children}
    </AuthContext.Provider>
  );
};
