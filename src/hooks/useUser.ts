import { useState, useEffect } from "react";
import { User } from "@/models/User";
import { IS_MOCK, apiUrl } from "@/config/config";

const MOCK_DB: User = {
  id: 1,
  name: "Walter",
  fullname: "Walter Ambriz",
  status: "Pro",
  level: 42,
  avatar:
    "https://media.licdn.com/dms/image/v2/D4E03AQETpxwVvZtA3g/profile-displayphoto-shrink_800_800/B4EZb7WUNWGUAc-/0/1747973654608?e=1771459200&v=beta&t=krLRVnm45gX6aeByuPyt6eHFEQkdwPdxX5a0fFUR9FM",
};

const getInitialUser = (): User | null => {
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    if (IS_MOCK) {
      return MOCK_DB;
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