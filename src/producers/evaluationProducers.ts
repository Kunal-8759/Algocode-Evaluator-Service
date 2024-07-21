import evaluationQueue from "../queues/evaluationQueue";

export default async function (payload:Record<string,unknown>){
    await evaluationQueue.add("EvaluationJob",payload);//insertion of job in the queue 
    console.log("successfully added a new Job in the Evaluation Queue");
    
}