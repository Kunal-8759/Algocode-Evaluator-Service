import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validate =(schema:ZodSchema<any>)=>(req:Request,res:Response,next:NextFunction)=>{
    try {
        schema.parse({
            ...req.body
            //the schema you recieved will be matched with the req.body if it is true be called the next i.e controllers else log the error
        });
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:'invalid request params recieved',
            data :{},
            error:error
        });
    }
};