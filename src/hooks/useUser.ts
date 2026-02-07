import { useState, useEffect } from "react";
import { User } from "@/models/User";
import { IS_MOCK, apiUrl } from "@/config/config";
import { MOCK_USER } from "@/mocks/mocks";
import { useAuth } from '@/context/AuthContext';

const getInitialUser = (authUserId: number | null, authAccessToken: string | null): User | null => {
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      // Ensure the stored user matches the authenticated user if auth data is available
      if (authUserId && user.id === authUserId) {
        return user;
      } else if (!authUserId) { // If no authUserId, return stored user if it exists
        return user;
      }
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
  const { userId: authUserId, accessToken: authAccessToken } = useAuth();
  const [user, setUser] = useState<User | null>(() => getInitialUser(authUserId, authAccessToken));
  const [loading, setLoading] = useState<boolean>(!user);

  useEffect(() => {
    // If we already have a user from localStorage or mock, and it matches the authenticated user, no need to fetch.
    if (user && user.id === authUserId && !IS_MOCK) {
      setLoading(false);
      return;
    }
    // If in mock mode, set user from MOCK_USER and stop loading.
    if (IS_MOCK) {
      setUser(MOCK_USER);
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      if (!authUserId || !authAccessToken) {
        setLoading(false);
        return; // No auth data, cannot fetch user
      }

      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/users/${authUserId}`, {
          headers: {
            'Authorization': `Bearer ${authAccessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: User = await response.json();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data)); // Keep for initial load in future sessions
      } catch (error) {
        console.error("Error fetching user:", error);
        // Maybe clear session storage if the token is invalid
        // sessionStorage.removeItem("isAuthenticated");
        setUser(null); // Clear user if fetch fails
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if not in mock mode and auth data is available
    if (!IS_MOCK && authUserId && authAccessToken) {
      fetchUser();
    } else if (!authUserId || !authAccessToken) {
      // If auth data is missing, ensure loading is false and user is null
      setUser(null);
      setLoading(false);
      localStorage.removeItem("user");
    }

  }, [IS_MOCK, authUserId, authAccessToken]); // Rerun effect if mock status or auth data changes

  return { user, loading };
};