import { BadRequestError } from "../../errors/badRequestError";
import { logInfo } from "../../logger";
import { Configuration } from "./models/Configuration";
import { isValidId } from "./validation/idValidation";

export const deleteConfiguration = async (id: string) => {
    if (!isValidId(id)) {
        throw new BadRequestError("The provided id is invalid");
    }
    logInfo("Deleting configuration with id", id);
    await Configuration.findByIdAndDelete(id);
    return id;
};
