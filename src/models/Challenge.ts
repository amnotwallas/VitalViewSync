export interface Challenge {
    id: number;
    type: "steps" | "distance" | "calories";
    title: string;
    label?: string;
    goal: number;
}