import { BadRequestError } from "../../errors/badRequestError";
import { logInfo } from "../../logger";
import { Configuration } from "./models/Configuration";
import { isValidId } from "./validation/idValidation";

/**
 * Retrieves a configuration by its id
 * @param id - the id of the configuration to be retrieved
 * @throws BadRequestError if the given id is not a valid mongo id
 * @returns the configuration with the given id or null if it was not found
 */
export const getConfigurationById = async (id: string) => {
    if (!isValidId(id)) {
        throw new BadRequestError("The provided id is invalid");
    }
    logInfo("Getting configuration with id", id);
    const configuration = await Configuration.findById(id);
    return configuration;
};
