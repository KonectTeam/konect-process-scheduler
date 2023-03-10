export interface SchedulerStep {
    begin: number;
    end: number;
    process: string;
}

export interface SchedulerProcess {
    process: string;
    arrivalTime: number;
    burstTime: number;
}

export interface SchedulerProcessExecutionResult {
    steps: SchedulerStep[];
}