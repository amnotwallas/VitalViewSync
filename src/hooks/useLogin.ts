// src/hooks/useLogin.ts
import { useState } from "react";
import { LoginCredentials } from "@/models/Login";
import { IS_MOCK } from "@/config/config";
import { User } from "@/models/User";
import { MOCK_USER } from "@/mocks/mocks"


export const useLogin = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setError("");
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const handleSuccessfulLogin = (user: User) => {
        // Store user data to be picked up by other hooks or components
        localStorage.setItem("user", JSON.stringify(user));
        // Legacy items, might be deprecated if components are refactored
        localStorage.setItem("name", user.name);
        localStorage.setItem("fullname", user.fullname);
        localStorage.setItem("status", user.status);
        localStorage.setItem("level", String(user.level));
        localStorage.setItem("avatar", user.avatar);
        console.log("Login successful");
        return true;
      };

      if (IS_MOCK) {
        if (
          credentials.email === "mock@user.com" &&
          credentials.password === "password"
        ) {
          return handleSuccessfulLogin(MOCK_USER);
        }
      }

      if (
        credentials.email === "admin@gmail.com" &&
        credentials.password === "admin123"
      ) {
        // In a real scenario, you'd fetch the user data from the API
        return handleSuccessfulLogin(MOCK_USER);
      }
      
      setError("Invalid email or password. Please try again.");
      return false;

    } catch (apiError) {
      setError("An unexpected error occurred. Please try again later.");
      console.error("Login API error:", apiError);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
