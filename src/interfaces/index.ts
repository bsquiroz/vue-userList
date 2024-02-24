type Ocupation = "frontend" | "backend" | "Q&A" | "DevOps";

export type Filters =
    | "frontend"
    | "backend"
    | "Q&A"
    | "DevOps"
    | "active"
    | "inactive"
    | null;

export interface User {
    id: string;
    name: string;
    state: boolean;
    ocupation: Ocupation;
}
