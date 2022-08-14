import { SendNewConfigurationFunction } from "../configurationChange/newConfiguration/type";
import { CreateConfigurationFunction } from "../interfaces/createConfiguration.type";
import { Configuration } from "./Configuration.type";
import { CONFIGURATION_CHANNEL } from "./configurationChannel";

export interface CreateConfigurationPayload {
    configurationPayload: Configuration;
    createConfigurationFunction: CreateConfigurationFunction;
    sendNewConfiguration: SendNewConfigurationFunction;
}

export const createConfiguration = async ({
    configurationPayload,
    createConfigurationFunction,
    sendNewConfiguration,
}: CreateConfigurationPayload) => {
    const configuration = await createConfigurationFunction(configurationPayload);
    sendNewConfiguration(CONFIGURATION_CHANNEL, configuration);
    return configuration;
};
