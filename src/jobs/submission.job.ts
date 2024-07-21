import { Job } from 'bullmq';

import logger from '../config/logger.config';
import { IJob } from '../types/bullMq.jobdefinition';
import { ExecutionResponse } from '../types/codeExecutorStrategy';
import { SubmissionPayload } from '../types/submissionPayload';
import createExecutor from '../utils/ExecutorFactory';

export default class SubmissionJob implements IJob {
    name: string;
    payload: Record<string, SubmissionPayload>;

    constructor(payload: Record<string, SubmissionPayload>) {
        this.name = this.constructor.name;
        this.payload = payload;
    }

    handle = async (job?: Job) => {
        logger.info("handler of the job is called");

        if (job) {
            const key = Object.keys(this.payload)[0];
            const codeLanguage = this.payload[key].language;
            const code = this.payload[key].code;
            const inputTestCase = this.payload[key].inputCase;
            const outputTestCase = this.payload[key].outputCase;

            const codeResponse: ExecutionResponse | null = await createExecutor(codeLanguage, code, inputTestCase,outputTestCase);

            if (codeResponse) {
                const status: string = codeResponse.status;

                if (status == "SUCCESS") {
                    console.log('code executed successfully');
                    console.log(codeResponse);
                    console.log('output is :', codeResponse.output);
                }
                else {
                    console.log('something went wrong');
                    console.log(codeResponse);
                }

            }




        }
    };
    failed = (job?: Job) => {
        logger.error("job failed");
        if (job) {
            console.log(job.id);
        }
    };
}