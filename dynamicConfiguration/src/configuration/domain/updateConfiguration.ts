import { MessageType, SendMessageFunction } from "../configurationChange/type";
import { UpdateConfigurationFunction } from "../interfaces/updateConfiguration.type";
import { convertConfigurationPayload } from "../ports/domainToStore/convertConfigurationPayload";
import { convertConfiguration } from "../ports/storeToDomain/convertConfiguration";
import { Configuration } from "./Configuration.type";
import { CONFIGURATION_CHANNEL } from "./configurationChannel";

export interface UpdateConfigurationPayload {
    id: string;
    configurationPayload: Configuration;
    updateConfigurationInStore: UpdateConfigurationFunction;
    sendMessage: SendMessageFunction;
}

export const updateConfiguration = async ({
    id,
    configurationPayload,
    updateConfigurationInStore,
    sendMessage,
}: UpdateConfigurationPayload) => {
    const convertedConfigurationPayload = convertConfigurationPayload(configurationPayload);
    const updatedConfiguration = convertConfiguration(
        await updateConfigurationInStore(id, convertedConfigurationPayload)
    );

    sendMessage(CONFIGURATION_CHANNEL, {
        type: MessageType.REFETCH,
    });

    return updatedConfiguration;
};
