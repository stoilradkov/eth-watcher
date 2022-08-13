import { validate as jsonValidate } from "jsonschema";
import { BadRequestError } from "../../../errors/badRequestError";
import { Configuration } from "../../domain/Configuration.type";
import configurationSchema from "../../schema.json";

export function validate(configurationPayload: unknown): asserts configurationPayload is Configuration {
    if (configurationPayload === undefined || !jsonValidate(configurationPayload, configurationSchema).valid) {
        throw new BadRequestError("Please provide a valid configuration");
    }
}
