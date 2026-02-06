import { useState, useEffect } from "react";
import { Metrics } from "@/models/Metrics";
import { IS_MOCK, apiUrl } from "@/config/config";
import { MOCK_METRICS } from "@/mocks/mocks"


export const useMetrics = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(
    IS_MOCK ? MOCK_METRICS : null,
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
