import { useState, useEffect } from "react";
import { Metrics } from "@/models/Metrics";
import { IS_MOCK, apiUrl } from "@/config/config";

const MOCK_DB: Metrics = {
  steps: 6400,
  distance: 5.2,
  sleep: {
    totalSleep: 450,
    deepSleep: 120,
    lightSleep: 270,
    remSleep: 60,
  },
  heartRate: 68,
  stressLevel: 3,
  calories: 2200,
};

export const useMetrics = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(
    IS_MOCK ? MOCK_DB : null,
  );
  const [loading, setLoading] = useState(!IS_MOCK);

  useEffect(() => {
    if (IS_MOCK) return;

    const fetchMetrics = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/metrics`);
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  return { metrics, loading };
};
