import {z} from "zod";


// define the interface
export type createSubmissionDto =z.infer<typeof createSubmissionZodSchema>;


//define the schema
export const createSubmissionZodSchema = z.object({
    userId:z.string(),
    problemId:z.string(),
    code : z.string(),
    language:z.string()
}).strict();