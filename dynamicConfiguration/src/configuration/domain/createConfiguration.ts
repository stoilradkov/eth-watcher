import { SendNewConfigurationMessageFunction } from "../configurationChange/newConfigurationMessage/type";
import { MessageType } from "../configurationChange/type";
import { CreateConfigurationFunction } from "../interfaces/createConfiguration.type";
import { convertConfigurationPayload } from "../ports/domainToStore/convertConfigurationPayload";
import { convertConfiguration } from "../ports/storeToDomain/convertConfiguration";
import { Configuration } from "./Configuration.type";
import { CONFIGURATION_CHANNEL } from "./configurationChannel";

export interface CreateConfigurationPayload {
    configurationPayload: Configuration;
    createConfigurationInStore: CreateConfigurationFunction;
    sendNewConfigurationMessage: SendNewConfigurationMessageFunction;
}

export const createConfiguration = async ({
    configurationPayload,
    createConfigurationInStore,
    sendNewConfigurationMessage,
}: CreateConfigurationPayload) => {
    const convertedConfigurationPayload = convertConfigurationPayload(configurationPayload);
    const configuration = convertConfiguration(await createConfigurationInStore(convertedConfigurationPayload));

    sendNewConfigurationMessage(CONFIGURATION_CHANNEL, {
        payload: configuration,
        type: MessageType.NEW,
    });

    return configuration;
};
