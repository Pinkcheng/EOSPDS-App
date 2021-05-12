import { Building } from ".";

export interface Department {
    id: string;
    floor: string;
    name: string;
    building: Building;
}
