export interface BiometricData {
  name: string;      // E.g., "6am", "Lun", "Sem 1"
  steps: number;
  distance: number;  // Assuming distance in km/miles
  calories: number;
}

export type BiometricDataArray = BiometricData[];