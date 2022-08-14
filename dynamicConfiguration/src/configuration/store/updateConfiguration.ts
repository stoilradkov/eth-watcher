import { BadRequestError } from "../../errors/badRequestError";
import { NotFoundError } from "../../errors/notFoundError";
import { Configuration } from "./models/Configuration";
import { ConfigurationAttributes } from "./models/type";
import { isValidId } from "./validation/idValidation";

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

    await existingConfiguration.save();
    return existingConfiguration;
};
