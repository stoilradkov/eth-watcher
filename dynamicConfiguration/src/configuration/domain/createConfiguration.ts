import { SendNewConfigurationFunction } from "../configurationChange/newConfiguration/type";
import { MessageType } from "../configurationChange/type";
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
    sendNewConfiguration(CONFIGURATION_CHANNEL, {
        payload: configuration,
        type: MessageType.NEW,
    });
    return configuration;
};
