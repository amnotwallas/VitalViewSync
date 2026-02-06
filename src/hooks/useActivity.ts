import { useState, useEffect } from 'react';
import { ActivityMetrics } from '@/models/Activity';
import { MOCK_ACTIVITY } from "@/mocks/mocks"


/**
 * Custom hook to fetch and manage combined biometric data for the dashboard.
 * It simulates an API call and provides loading, error, and data states.
 *
 * @returns {object} An object containing:
 *  - data: The fetched DashboardMetrics, or null if not yet loaded/error.
 *  - isLoading: A boolean indicating if data is currently being fetched.
 *  - error: A string containing an error message, if any.
 */
export const useActivity = () => {
  const [data, setData] = useState<ActivityMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBiometricData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Simulate API call to your backend endpoint (e.g., /api/dashboard-metrics)
        // In a real app, this would be:
        // const response = await fetch('/api/dashboard-metrics');
        // if (!response.ok) throw new Error('Failed to fetch biometric data');
        // const fetchedData: DashboardMetrics = await response.json();
        // setData(fetchedData);

        // Using mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        setData(MOCK_ACTIVITY);

      } catch (err) {
        console.error("Error fetching biometric data:", err);
        setError("Failed to load biometric data. Please try again.");
        setData(null); // Clear data on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchBiometricData();
  }, []); // Empty dependency array means this runs once on mount

  return { data, isLoading, error };
};