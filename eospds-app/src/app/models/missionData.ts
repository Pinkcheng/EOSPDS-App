import { Department } from './department';
import { MissionLabel } from './missionLabel';
import { missionProcess } from './missionProcess';
export interface MissionData {
    "id": string,
    "content": string,
    "status": number,
    "createTime": string,
    "label": MissionLabel,
    "instrument": {
        "id": string,
        "name": string
    },
    "startDepartment": Department,
    "endDepartment": Department,
    "porter": {
        "id": string,
        "name": string,
        "tagNumber": string,
        "birthday": null,
        "gender": number,
        "status": number
    },
    "process": missionProcess[]
}