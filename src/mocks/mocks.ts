import { ActivityMetrics } from '@/models/Activity';
import { BiometricDataArray } from '@/models/BiometricData';
import { User } from "@/models/User";
import { Metrics } from "@/models/Metrics";
import { Challenge } from "@/models/Challenge";

export const MOCK_USER: User = {
  id: 1,
  name: "Walter",
  fullname: "Walter Ambriz",
  status: "Pro",
  level: 42,
  avatar:
    "https://media.licdn.com/dms/image/v2/D4E03AQETpxwVvZtA3g/profile-displayphoto-shrink_800_800/B4EZb7WUNWGUAc-/0/1747973654608?e=1771459200&v=beta&t=krLRVnm45gX6aeByuPyt6eHFEQkdwPdxX5a0fFUR9FM",
};

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
export const MOCK_ACTIVITY: ActivityMetrics = {
  today: mockTodayData,
  weekly: mockWeeklyData,
  monthly: mockMonthlyData,
};

export const MOCK_METRICS: Metrics = {
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

export const MOCK_CHALLENGE: Challenge = {
    id: 1,
    type: "steps",
    title: "Próximo Reto: Maratón 10K",
    goal: 10000,
};

export default { MOCK_USER, MOCK_ACTIVITY, MOCK_METRICS, MOCK_CHALLENGE }