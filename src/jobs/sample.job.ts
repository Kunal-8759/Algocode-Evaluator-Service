import { Job } from 'bullmq';

import { IJob } from '../types/bullMq.jobdefinition';

export default class SampleJob implements IJob {
    name: string;
    payload: Record<string, unknown>;

    constructor(payload: Record<string, unknown>) {
        this.name = this.constructor.name;
        this.payload = payload;
    }

    handle = (job?:Job) => {
        console.log("handler of the job is called");
        console.log(this.payload);
        if(job){
            console.log(job.name,job.id,job.data);//this job data me payload hi rehta hai basically
        }
    };
    failed = (job?:Job) => {
        console.log("job failed");
        if(job){
            console.log(job.id);
        }
    };
}