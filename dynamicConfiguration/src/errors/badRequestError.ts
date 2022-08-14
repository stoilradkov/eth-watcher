import { CustomError } from "./customError";
import { StatusCode } from "./statusCode";

export class BadRequestError extends CustomError {
    statusCode = StatusCode.BAD_REQUEST;
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        return { message: this.message };
    }
}
