import mongoose from "mongoose";
import { BadRequestError } from "../../errors/badRequestError";
import { portConfigurationNullable } from "../ports/configurationPort";
import { Configuration } from "./models/Configuration";

export const getConfigurationById = async (id: string) => {
    if (!isValidId(id)) {
        throw new BadRequestError("The provided id is invalid");
    }
    const configuration = await Configuration.findById(id);
    return portConfigurationNullable(configuration);
};

const isValidId = (id: string) => mongoose.isValidObjectId(id);
