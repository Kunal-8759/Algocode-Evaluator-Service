import { Job } from 'bullmq';
import { IJob } from '../types/bullMq.jobdefinition';

export default class SampleJob implements IJob {
    name: string;
    payload: Record<string, unknown>;

    constructor(payload: Record<string, unknown>) {
        this.name = this.constructor.name;
        this.payload = payload;
    }

    handle = () => {
        console.log("ghandler of the job is called");
    }
    failed = () => {
        console.log("job failed");
    }
}