import { Metrics } from "@/models/Metrics";
/*
export interface Kpis {
    steps: Metrics["steps"];
    distance: Metrics["distance"];
    timeSleep: Metrics["sleep"]["totalSleep"];
    heartRate: Metrics["heartRate"];
}
*/
type BaseKpis = Pick<Metrics, "steps" | "distance" | "heartRate">;

export interface Kpis extends BaseKpis {
    timeSleep: Metrics["sleep"]["totalSleep"];
}