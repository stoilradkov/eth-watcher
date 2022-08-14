import { BadRequestError } from "../../../errors/badRequestError";

/**
 * Asserts the given id is a string
 * @param id - id to be validated
 * @throws BadRequestError if the id is not of string type
 */
export function validateId(id: string | undefined): asserts id is string {
    if (id === undefined || typeof id !== "string") {
        throw new BadRequestError("Please specify an id");
    }
}
