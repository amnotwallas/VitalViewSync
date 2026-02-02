import { useState, useEffect } from 'react';
import { ActivityMetrics } from '@/models/Activity'; // Import the combined payload interface
import { BiometricDataArray } from '@/models/BiometricData'; // Import the BiometricData type

// Example mock data (this would come from your backend API)
const mockTodayData: BiometricDataArray = [
  { name: "6am", steps: 200, distance: 1.5, calories: 600 },
  { name: "7am", steps: 800, distance: 0.8, calories: 300 },
  { name: "8am", steps: 1200, distance: 0.8, calories: 300 },
  { name: "10am", steps: 2500, distance: 1.5, calories: 600 },
  { name: "12pm", steps: 800, distance: 0.5, calories: 200 },
  { name: "2pm", steps: 3200, distance: 2.1, calories: 750 },
  { name: "4pm", steps: 1500, distance: 1.0, calories: 400 },
  { name: "6pm", steps: 4100, distance: 2.8, calories: 900 },
];

const mockWeeklyData: BiometricDataArray = [
  { name: "Lun", steps: 8400, distance: 5.2, calories: 2100 },
  { name: "Mar", steps: 10200, distance: 6.8, calories: 2450 },
  { name: "Mie", steps: 7800, distance: 4.9, calories: 1980 },
  { name: "Jue", steps: 12400, distance: 8.1, calories: 2800 },
  { name: "Vie", steps: 9100, distance: 6.0, calories: 2250 },
  { name: "Sab", steps: 15600, distance: 10.4, calories: 3100 },
  { name: "Dom", steps: 6400, distance: 4.1, calories: 1850 },
];

const mockMonthlyData: BiometricDataArray = [
  { name: "Sem 1", steps: 48500, distance: 31.5, calories: 11500 },
  { name: "Sem 2", steps: 52300, distance: 34.0, calories: 12800 },
  { name: "Sem 3", steps: 45600, distance: 29.8, calories: 10900 },
  { name: "Sem 4", steps: 55100, distance: 36.2, calories: 13500 },
];

// Combine mock data into the DashboardMetrics structure
const mockDashboardData: ActivityMetrics = {
  today: mockTodayData,
  weekly: mockWeeklyData,
  monthly: mockMonthlyData,
};


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
        setData(mockDashboardData);

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