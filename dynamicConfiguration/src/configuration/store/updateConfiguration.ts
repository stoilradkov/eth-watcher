import { BadRequestError } from "../../errors/badRequestError";
import { NotFoundError } from "../../errors/notFoundError";
import { logInfo } from "../../logger";
import { Configuration } from "./models/Configuration";
import { ConfigurationAttributes } from "./models/type";
import { isValidId } from "./validation/idValidation";

/**
 * Updates a configuration by a given id and new attributes
 * @param id - the id of the configuration to be updated
 * @param configurationPayload - object containing the attributes of the configuration which should be updated
 * @throws BadRequestError if the provided id is not a valid mongo id or NotFoundError if no configuration is found with the given id
 * @returns the updated configuration
 */
export const updateConfiguration = async (id: string, configurationPayload: ConfigurationAttributes) => {
    if (!isValidId(id)) {
        throw new BadRequestError("The provided id is invalid");
    }

    const existingConfiguration = await Configuration.findById(id);
    if (existingConfiguration === null) {
        throw new NotFoundError();
    }

    (Object.keys(configurationPayload) as Array<keyof ConfigurationAttributes>).forEach(key => {
        (existingConfiguration[key] as unknown) = configurationPayload[key];
    });
    logInfo("Updated configuration", existingConfiguration);

    await existingConfiguration.save();
    return existingConfiguration;
};
