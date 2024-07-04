import submissionQueues from "../queues/submissionQueues";
import { SubmissionPayload } from "../types/submissionPayload";

export default async function (payload:Record<string,SubmissionPayload>){
    await submissionQueues.add("SubmissionJob",payload);//insertion of job in the queue 
    console.log("successfully added a new Job in the submission Queue");
    
}