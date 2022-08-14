import { MessageType, SendMessageFunction } from "../configurationChange/type";
import { CreateConfigurationFunction } from "../interfaces/createConfiguration.type";
import { convertConfigurationPayload } from "../ports/domainToStore/convertConfigurationPayload";
import { convertConfiguration } from "../ports/storeToDomain/convertConfiguration";
import { Configuration } from "./Configuration.type";
import { CONFIGURATION_CHANNEL } from "./configurationChannel";

export interface CreateConfigurationPayload {
    configurationPayload: Configuration;
    createConfigurationInStore: CreateConfigurationFunction;
    sendMessage: SendMessageFunction;
}

export const createConfiguration = async ({
    configurationPayload,
    createConfigurationInStore,
    sendMessage,
}: CreateConfigurationPayload) => {
    const convertedConfigurationPayload = convertConfigurationPayload(configurationPayload);
    const configuration = convertConfiguration(await createConfigurationInStore(convertedConfigurationPayload));

    sendMessage(CONFIGURATION_CHANNEL, {
        type: MessageType.REFETCH,
    });

    return configuration;
};
