import { useState, useEffect } from "react";
import { Challenge } from "@/models/Challenge";
import { IS_MOCK, apiUrl } from "@/config/config";

const MOCK_DB: Challenge = {
    id: 1,
    type: "steps",
    title: "Próximo Reto: Maratón 10K",
    goal: 10000,
};

export const useChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge | null>(
    IS_MOCK ? MOCK_DB : null,
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
