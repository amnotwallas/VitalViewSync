import { useState, useEffect } from "react";
import { User } from "@/models/User";
import { IS_MOCK, apiUrl } from "@/config/config";
import { MOCK_USER } from "@/mocks/mocks"


const getInitialUser = (): User | null => {
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    if (IS_MOCK) {
      return MOCK_USER;
    }
    return null;
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
    return null;
  }
};

export const useUser = () => {
  const [user, setUser] = useState<User | null>(getInitialUser);
  const [loading, setLoading] = useState<boolean>(!user);

  useEffect(() => {
    // If we already have a user (from localStorage or mock), no need to fetch.
    if (user || IS_MOCK) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/users/me`);
        const data: User = await response.json();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching user:", error);
        // Maybe clear session storage if the token is invalid
        // sessionStorage.removeItem("isAuthenticated");
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if not in mock mode and no user is loaded initially
    if (!IS_MOCK && !user) {
      fetchUser();
    }

  }, [IS_MOCK]); // Dependency array ensures this runs if mock status changes

  return { user, loading };
};