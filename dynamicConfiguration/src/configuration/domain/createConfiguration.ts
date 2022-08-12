import { BadRequestError } from "../../errors/badRequestError";
import { CreateConfigurationFunction } from "../interfaces/createConfigurationFunction.type";
import { Configuration } from "./Configuration.type";

export const createConfiguration = async (
    configurationPayload: Configuration,
    createConfigurationFunction: CreateConfigurationFunction
) => createConfigurationFunction(configurationPayload);
