import { Job } from 'bullmq';

import logger from '../config/logger.config';
import runCpp from '../containers/runCppDocker';
import { IJob } from '../types/bullMq.jobdefinition';
import { SubmissionPayload } from '../types/submissionPayload';

export default class SubmissionJob implements IJob {
    name: string;
    payload: Record<string, SubmissionPayload>;

    constructor(payload: Record<string, SubmissionPayload>) {
        this.name = this.constructor.name;
        this.payload = payload;
    }

    handle = async (job?:Job) => {
        logger.info("handler of the job is called");

        console.log(this.payload);


        if(job){
            const key =Object.keys(this.payload)[0];
            console.log(this.payload[key].language);
            if(this.payload[key].language==='CPP'){
                await runCpp(this.payload[key].code,this.payload[key].inputCase);
            }

        }
    };
    failed = (job?:Job) => {
        logger.error("job failed");
        if(job){
            console.log(job.id);
        }
    };
}