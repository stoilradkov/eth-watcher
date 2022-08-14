import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/customError";
import { StatusCode } from "../errors/statusCode";
import { logError } from "../logger";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (error: Error, req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof CustomError) {
        return res.status(error.statusCode).send(error.serializeErrors());
    }

    logError("Unexpected error", error);
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: "Something went wrong" });
};
