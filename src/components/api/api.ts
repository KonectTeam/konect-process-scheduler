export interface SchedulerStep {
    begin: number;
    end: number;
    process: string;
}

export interface SchedulerProcess {
    name: string;
    arrivalTime: number;
    burstTime: number;
}

export interface SchedulerProcessExecutionInfo {
    arrivalTime: number;
    burstTime: number;
    finishTime: number;
    turnAroundTime: number;
    waitingTime: number;
}

export interface SchedulerProcessExecutionResult {
    steps: SchedulerStep[];
    processesInfo: SchedulerProcessExecutionInfo[];
}