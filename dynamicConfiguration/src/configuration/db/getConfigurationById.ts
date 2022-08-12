import mongoose from "mongoose";
import { BadRequestError } from "../../errors/badRequestError";
import { portConfiguration } from "../ports/configurationPort";
import { Configuration } from "./models/Configuration";

export const getConfigurationById = async (id: string) => {
    if (!isValidId(id)) {
        throw new BadRequestError("The provided id is invalid");
    }
    const configuration = await Configuration.findById(id);
    return portConfiguration(configuration);
};

const isValidId = (id: string) => mongoose.isValidObjectId(id);
