import { Metrics } from "@/models/Metrics";

export interface Goal {
    steps: Metrics["steps"];       // number
    distance: Metrics["distance"]; // number
    // optional  goals
    sleep?: number;
    heartRate?: number;
    stressLevel?: number;
}