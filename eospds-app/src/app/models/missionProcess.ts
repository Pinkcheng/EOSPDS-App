
export interface missionProcess {
    add: {
        time: Date | null,
        handover: any | null
    },
    start: {
        time: Date | null,
        handover: any | null
    },
    in_process: {
        time: Date | null,
        handover: any | null
    },
    finish: {
        time: Date | null,
        handover: any | null
    },
}
