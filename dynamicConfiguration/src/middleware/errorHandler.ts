import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/customError";
import { StatusCode } from "../errors/statusCode";
import { logError } from "../logger";

/**
 * Middleware to catch errors thrown from api endpoints. Send back either an expect error
 * or a server error with a message "Something went wrong".
 * @param error - error which was thrown
 * @param req - request object
 * @param res - response object
 * @param _next - express next function
 * @returns response object
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (error: Error, req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof CustomError) {
        return res.status(error.statusCode).send(error.serializeErrors());
    }

    logError("Unexpected error", error);
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: "Something went wrong" });
};
