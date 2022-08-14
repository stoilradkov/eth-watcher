import { BadRequestError } from "../../errors/badRequestError";
import { logInfo } from "../../logger";
import { Configuration } from "./models/Configuration";
import { isValidId } from "./validation/idValidation";

export const getConfigurationById = async (id: string) => {
    if (!isValidId(id)) {
        throw new BadRequestError("The provided id is invalid");
    }
    logInfo("Getting configuration with id", id);
    const configuration = await Configuration.findById(id);
    return configuration;
};
