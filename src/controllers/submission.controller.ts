import { Request, Response } from "express";

import { createSubmissionDto } from "../dtos/createSubmission.dto";

export function addSubmission(req:Request,res:Response){
    const submissionDto=req.body as createSubmissionDto;//ensures the incoming data conforms to the expected interface
    console.log(submissionDto);


    return res.status(201).json({
        success: true,
        error: {},
        message: 'Successfully collected the submission',
        data: submissionDto
    });
}