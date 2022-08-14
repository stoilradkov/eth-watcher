import { BadRequestError } from "../../errors/badRequestError";
import { logInfo } from "../../logger";
import { Configuration } from "./models/Configuration";
import { isValidId } from "./validation/idValidation";

/**
 * Deletes a configuration
 * @param id - the id of the configuration to be deleted
 * @returns the id of the configuration which was deleted
 */
export const deleteConfiguration = async (id: string) => {
    if (!isValidId(id)) {
        throw new BadRequestError("The provided id is invalid");
    }
    logInfo("Deleting configuration with id", id);
    await Configuration.findByIdAndDelete(id);
    return id;
};
