import { SchedulerProcess } from "../../components/api/api";
import { expect } from "chai";

import FCFSAlgo from "../../components/api/FCFSAlgo";
import ProcessSchedulerAlgo from "../../components/api/ProcessSchedulerAlgo";

describe('Test the FCFS algorithm with many scenarios', () => {

    it('Should return empty steps because the process list is empty', () => {
        const algo = new FCFSAlgo([]);
        const result = algo.schedule();

        expect(result.steps.length).to.be.equal(0);
    });

    it('Should throw an error because there is a process with negative burst time', () => {
        const algo = new FCFSAlgo([{
            name: 'A',
            arrivalTime: 0,
            burstTime: -10
        }]);

        expect(() => algo.schedule()).to.throw('Negative numbers are invalid for the arrival time or burst time');
    });

    it('Should throw an error because there is a process with negative arrival time', () => {
        const algo = new FCFSAlgo([{
            name: 'A',
            arrivalTime: -10,
            burstTime: 10
        }]);

        expect(() => algo.schedule()).to.throw('Negative numbers are invalid for the arrival time or burst time');
    });

    it('Should throw an error because there is a process with a burst time equal to 0', () => {
        const algo = new FCFSAlgo([{
            name: 'A',
            arrivalTime: 0,
            burstTime: 0
        }]);

        expect(() => algo.schedule()).to.throw('0 burst time is invalid');
    });

    it('Should return one step', () => {
        const algo = new FCFSAlgo([{
            name: 'A',
            arrivalTime: 0,
            burstTime: 10
        }]);

        const result = algo.schedule();

        expect(result.steps.length).to.be.equal(1);
        expect(result.steps[0]).deep.be.equal({
            process: 'A',
            begin: 0,
            end: 10
        });
        expect(result.processesInfo.length).to.be.equal(1);
        expect(result.processesInfo[0]).deep.be.equal({
            arrivalTime: 0,
            burstTime: 10,
            finishTime: 10,
            turnAroundTime: 10,
            waitingTime: 0
        });
    });

    it('Should return two steps, and the first is an empty process', () => {
        const algo = new FCFSAlgo([{
            name: 'A',
            burstTime: 10,
            arrivalTime: 10
        }]);

        const { steps, processesInfo } = algo.schedule();

        expect(steps.length).to.be.equal(2);
        expect(processesInfo.length).to.be.equal(1);

        expect(steps[0]).deep.be.equal({
            process: ProcessSchedulerAlgo.EMPTY_PROCESS,
            begin: 0,
            end: 10
        });

        expect(steps[1]).deep.be.equal({
            process: 'A',
            begin: 10,
            end: 20
        });

        expect(processesInfo[0]).deep.equal({
            arrivalTime: 10,
            burstTime: 10,
            finishTime: 20,
            turnAroundTime: 10,
            waitingTime: 0
        });
    });

    it('Should return three steps with an empty one', () => {
        const algo = new FCFSAlgo([{
            name: 'A',
            arrivalTime: 0,
            burstTime: 10
        }, {
            name: 'B',
            arrivalTime: 19,
            burstTime: 39
        }]);

        const result = algo.schedule();
        const steps = result.steps;
        const processesInfo = result.processesInfo;

        expect(steps.length).to.be.equal(3);
        expect(steps[0]).deep.be.equal({
            process: 'A',
            begin: 0,
            end: 10
        });
        expect(steps[1]).deep.be.equal({
            process: ProcessSchedulerAlgo.EMPTY_PROCESS,
            begin: 10,
            end: 19
        });

        expect(steps[2]).deep.be.equal({
            process: 'B',
            begin: 19,
            end: 58
        });


        expect(processesInfo.length).to.be.equal(2);
        expect(processesInfo[0]).deep.be.equal({
            arrivalTime: 0,
            burstTime: 10,
            finishTime: 10,
            turnAroundTime: 10,
            waitingTime: 0
        });
        expect(processesInfo[1]).deep.be.equal({
            arrivalTime: 19,
            burstTime: 39,
            finishTime: 58,
            turnAroundTime: 39,
            waitingTime: 0
        });
    });
});