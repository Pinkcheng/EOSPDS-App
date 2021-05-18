import { Department } from './department';
import { PorterType } from "./porterType";

export interface PorterData {
    "id": string,
    "name": string,
    "tagNumber": string,
    "birthday": null,
    "department": Department,
    "gender": number,
    "type": PorterType,
    "status": number,
    "count": number
}
