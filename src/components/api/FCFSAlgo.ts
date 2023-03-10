import ProcessSchedulerAlgo from "./ProcessSchedulerAlgo";

import { SchedulerStep, SchedulerProcess, SchedulerProcessExecutionResult, SchedulerProcessExecutionInfo } from './api';

export default class FCFSAlgo extends ProcessSchedulerAlgo {
    
    constructor(processes: Array<SchedulerProcess>) {
        super(processes);
    }
    
    execute(): SchedulerProcessExecutionResult {
        // check if there is negatives values for the arrival time or burst time
        if (this.processes.some(process => process.arrivalTime < 0 || process.burstTime < 0)) {
            throw 'Negative numbers are invalid for the arrival time or burst time';
        }

        // check now if there is at least a process with a burst time equal to 0
        if (this.processes.some(process => process.burstTime === 0)) {
            throw '0 burst time is invalid';
        }

        const steps = new Array<SchedulerStep>();
        const processesInfo = new Array<SchedulerProcessExecutionInfo>();
        const executionStart = new Date().getTime();
        let currentTime = 0;
        let currentProcess: SchedulerProcess;

        // sort the processes by their arrival time
        let processes = [...this.processes].sort((p1, p2) => p1.arrivalTime - p2.arrivalTime);

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
                    process: currentProcess.name
                });

                processesInfo.push({
                    arrivalTime,
                    burstTime,
                    finishTime: end,
                    turnAroundTime: end - arrivalTime,
                    waitingTime: (end - arrivalTime) - burstTime
                });

                processes = processes.filter(process => process.name !== currentProcess.name);
            }            
        }

        return {
            steps,
            processesInfo,
            executionTimeInMS: new Date().getTime() - executionStart
        };
    }    
}