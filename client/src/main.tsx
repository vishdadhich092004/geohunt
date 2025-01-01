import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { Analytics } from "@vercel/analytics/react";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <App />
        <Analytics />
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
