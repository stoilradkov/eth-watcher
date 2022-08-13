import { CreateConfigurationFunction } from "../interfaces/createConfiguration.type";
import { Configuration } from "./Configuration.type";

export const createConfiguration = async (
    configurationPayload: Configuration,
    createConfigurationFunction: CreateConfigurationFunction
) => createConfigurationFunction(configurationPayload);
