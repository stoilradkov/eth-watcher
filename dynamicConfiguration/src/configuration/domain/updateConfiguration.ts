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

/**
 * Updates a configuration by a given id and new attributes, sends a message to a publisher
 * @param id - the id of the configuration to be updated
 * @param configurationPayload - object containing the attributes of the configuration which should be updated
 * @param updateConfigurationInStore - a function which is called to store the updated configuration
 * @param sendMessage - a function which is called to send a message
 * @returns the updated configuration
 */
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
