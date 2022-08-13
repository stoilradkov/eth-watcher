import { BadRequestError } from "../../errors/badRequestError";
import { NotFoundError } from "../../errors/notFoundError";
import { Configuration as ConfigurationType } from "../domain/Configuration.type";
import { portConfiguration } from "../ports/configurationPort";
import { Configuration } from "./models/Configuration";
import { isValidId } from "./util/idValidation";

export const updateConfiguration = async (id: string, configurationPayload: ConfigurationType) => {
    if (!isValidId(id)) {
        throw new BadRequestError("The provided id is invalid");
    }

    const existingConfiguration = await Configuration.findById(id);
    if (existingConfiguration === null) {
        throw new NotFoundError();
    }

    (Object.keys(configurationPayload) as Array<keyof ConfigurationType>).forEach(key => {
        (existingConfiguration[key] as unknown) = configurationPayload[key];
    });

    await existingConfiguration.save();

    return portConfiguration(existingConfiguration);
};
