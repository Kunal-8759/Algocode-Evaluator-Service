import  {Job} from 'bullmq';

export interface IJob {
    name:string
    payload:Record<string,unknown>//overall data will be there
    handle:(job?:Job) =>void//worker iss job se kya krega yahan define krna hai
    failed:(job?:Job) =>void//agar kuch fail ho gya to kaise handle krega
}