import { BadRequestError } from "../../errors/badRequestError";
import { Configuration } from "./models/Configuration";
import { isValidId } from "./validation/idValidation";

export const getConfigurationById = async (id: string) => {
    if (!isValidId(id)) {
        throw new BadRequestError("The provided id is invalid");
    }

    const configuration = await Configuration.findById(id);
    return configuration;
};
