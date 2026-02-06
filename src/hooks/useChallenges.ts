import { useState, useEffect } from "react";
import { Challenge } from "@/models/Challenge";
import { IS_MOCK, apiUrl } from "@/config/config";
import { MOCK_CHALLENGE } from "@/mocks/mocks"


export const useChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge | null>(
    IS_MOCK ? MOCK_CHALLENGE : null,
  );
  const [loading, setLoading] = useState(!IS_MOCK);

  useEffect(() => {
    if (IS_MOCK) return;

    const fetchChallenges = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/challenges`);
        const data = await response.json();
        setChallenges(data);
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChallenges();
  }, []);

  return { challenges, loading };
};
