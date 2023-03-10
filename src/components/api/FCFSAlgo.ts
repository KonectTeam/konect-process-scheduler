import ProcessSchedulerAlgo from "./ProcessSchedulerAlgo";

import { SchedulerStep, SchedulerProcess, SchedulerProcessExecutionResult } from './api';

export default class FCFSAlgo extends ProcessSchedulerAlgo {
    
    constructor(processes: Array<SchedulerProcess>) {
        super(processes);
    }
    
    execute(): SchedulerProcessExecutionResult {
        const steps = new Array<SchedulerStep>();

        let currentTime = 0;
        let currentProcess: SchedulerProcess;

        // sort the processes by their arrival time
        const processes = this.processes.sort((p1, p2) => p1.arrivalTime - p2.arrivalTime);

        while(processes.length > 0) {
            currentProcess = processes[0];
            const arrivalTime = currentProcess.arrivalTime;
            const burstTime = currentProcess.burstTime;

            // wait until we can execute the process
            if (currentTime < arrivalTime) {
                const beginTime = currentTime;
                while (currentTime < arrivalTime) {
                    currentTime++;
                }

                steps.push({
                    begin: beginTime,
                    end: currentTime,
                    process: '_'
                });
            } else {
                // we can execute the process
                const end = currentTime + burstTime;
                const begin = currentTime;
                while (currentTime < end) {
                    currentTime++;
                }

                steps.push({
                    begin,
                    end,
                    process: currentProcess.process
                });
            }            
        }

        return {
            steps
        };
    }    
}