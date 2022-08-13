import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/customError";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (error: Error, req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof CustomError) {
        return res.status(error.statusCode).send(error.serializeErrors());
    }
    console.error(error);
    return res.status(500).send({ message: "Something went wrong" });
};
