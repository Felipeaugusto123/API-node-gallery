import { ErrorRequestHandler } from "express";

export const errorHandler:ErrorRequestHandler = (err,req,res,next)=>{

    console.error(err);

    const status = err.status|500;

    res.status(status).json({
        err:{
            err:err.message
        }
    });

}