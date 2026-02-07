// src/hooks/useLogin.ts
import { useState } from "react";
import { LoginCredentials } from "@/models/Login";
import { IS_MOCK } from "@/config/config";
import { User } from "@/models/User";
import { MOCK_USER } from "@/mocks/mocks";
import { useAuth } from '@/context/AuthContext';
import { apiUrl } from "@/config/config"; // Assuming apiUrl is configured for API calls


export const useLogin = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthData } = useAuth();

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setError("");
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network latency

      const handleSuccessfulLogin = (user: User) => {
        if (user.id && user.sessionToken) {
          setAuthData(user.id, user.sessionToken);
          localStorage.setItem("user", JSON.stringify(user)); // Keep for initial load in useUser
          console.log("Login successful");
          return true;
        }
        setError("Missing user ID or session token in response.");
        return false;
      };

      if (!IS_MOCK) {
        // Handle admin as a specific dev login when not in mock mode
        if (
          credentials.email === "admin@gmail.com" &&
          credentials.password === "admin123"
        ) {
          return handleSuccessfulLogin({ ...MOCK_USER, sessionToken: "admin-dev-session-token-123" });
        }

        // Simulate real API call for other credentials
        // In a real scenario, you'd replace this with an actual fetch/axios call to your auth endpoint
        // Example: const response = await fetch(`${apiUrl}/auth/login`, { ... });
        if (
            credentials.email === "user@example.com" &&
            credentials.password === "password"
        ) {
            // Simulate a successful response from a real API
            const simulatedUser: User = {
                id: 2,
                name: "Real User",
                fullname: "Example Real User",
                status: "Active",
                level: 10,
                avatar: "https://example.com/avatar2.jpg",
                sessionToken: "real-user-session-token-456",
            };
            return handleSuccessfulLogin(simulatedUser);
        } else {
            setError("Invalid email or password. Please try again.");
            return false;
        }
      }
      
      // If IS_MOCK is true, login function should not be called as AuthProvider handles auto-login.
      // This branch should theoretically not be reached if AuthProvider correctly auto-logs in.
      setError("Login function called in mock mode without explicit handling.");
      return false;

    } catch (apiError) {
      setError("An unexpected error occurred during login. Please try again later.");
      console.error("Login error:", apiError);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
