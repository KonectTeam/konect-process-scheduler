import { expect } from "chai";

import FCFSAlgo from "../../components/api/FCFSAlgo";

describe('Test the FCFS algorithm with many scenarios', () => {

    it('Should return empty steps because the process list is empty', () => {
        const algo = new FCFSAlgo([]);
        const result = algo.execute();

        expect(result.steps.length).to.be.equal(0);
    });
});