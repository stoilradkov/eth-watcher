import { CustomError } from "./customError";
import { StatusCode } from "./statusCode";

export class NotFoundError extends CustomError {
    statusCode = StatusCode.NOT_FOUND;
    constructor() {
        super("Not found");
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return { message: "Not found" };
    }
}
