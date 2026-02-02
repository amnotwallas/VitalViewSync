import { BiometricDataArray } from "@/models/BiometricData";

export interface ActivityMetrics {
  today: BiometricDataArray; 
  weekly: BiometricDataArray;
  monthly: BiometricDataArray;
}