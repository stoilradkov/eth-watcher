import { validate as jsonValidate } from "jsonschema";
import { BadRequestError } from "../../../errors/badRequestError";
import { Configuration } from "../../domain/Configuration.type";
import configurationSchema from "../../configurationSchema.json";

/**
 * Asserts the given configuration payload is a valid configuration object
 * @param configurationPaylod - the payload to be checked
 * @throws BadRequestError if the payload is not valid
 */
export function validate(configurationPayload: unknown): asserts configurationPayload is Configuration {
    if (configurationPayload === undefined || !jsonValidate(configurationPayload, configurationSchema).valid) {
        throw new BadRequestError("Please provide a valid configuration");
    }
}
