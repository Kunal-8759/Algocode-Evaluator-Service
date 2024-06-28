import sampleQueue from "../queues/sample.queue";

export default async function (name:string,payload:Record<string,unknown>,priority:Record<string,unknown>){
    await sampleQueue.add(name,payload,priority);//insertion of job in the queue 
    console.log("successfully added a new Job");
    
}