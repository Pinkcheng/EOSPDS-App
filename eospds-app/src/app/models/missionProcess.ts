
export interface missionProcess {
    "status": string,
    "time": Date | null,
    "department": {
        "id": string,
        "name": string
    } | null
}
