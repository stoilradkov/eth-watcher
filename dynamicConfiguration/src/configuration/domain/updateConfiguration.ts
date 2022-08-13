import { UpdateConfigurationFunction } from "../interfaces/updateConfiguration.type";
import { Configuration } from "./Configuration.type";

export const updateConfiguration = async (
    id: string,
    configurationPayload: Configuration,
    updateConfigurationFunction: UpdateConfigurationFunction
) => updateConfigurationFunction(id, configurationPayload);
