import { SchedulerProcess, SchedulerProcessExecutionResult } from "./api";

export default abstract class ProcessSchedulerAlgo {

    static EMPTY_PROCESS: string = '_';

    protected processes: Array<SchedulerProcess>;

    constructor(processes: Array<SchedulerProcess>) {
        this.processes = processes;
    }

    abstract execute() : SchedulerProcessExecutionResult;
}