import { Sleep } from "@/models/Sleep";
export interface Metrics {
    steps: number;
    distance: number;
    sleep: Sleep;
    calories: number;
    heartRate: number;
    stressLevel: number;
  }