import { BadRequestError } from "../../../errors/badRequestError";

export function validateId(id: string | undefined): asserts id is string {
    if (id === undefined || typeof id !== "string") {
        throw new BadRequestError("Please specify an id");
    }
}
