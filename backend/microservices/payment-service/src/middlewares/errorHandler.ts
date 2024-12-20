import { Request, Response, NextFunction } from "express";
import {logger, getCallerLocation} from "../config/logger" // Adjust this to the correct path

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Ensure you're logging the stack trace of the actual error
    const errorLocation =  getCallerLocation();

    logger.error(err.message, {
        stack: err.stack, // This ensures the real error stack is used
        request: {
            method: req.method,
            url: req.url,
        },
        location: errorLocation, // Pass the extracted error location
    });

    // Send a generic error response
    res.status(500).json({
        message: "Something went wrong, please try again later.",
    });
};


export default errorHandler;
