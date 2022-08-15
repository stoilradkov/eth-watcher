import { MessageType, SendMessageFunction } from "../configurationChange/type";
import { DeleteConfigurationFunction } from "../interfaces/deleteConfiguration.type";
import { CONFIGURATION_CHANNEL } from "./configurationChannel";

export interface DeleteConfigurationPayload {
    id: string;
    deleteConfigurationInStore: DeleteConfigurationFunction;
    sendMessage: SendMessageFunction;
}

/**
 * Deletes a configuration and sends a message to a publisher
 * @param id - the id of the configuration to be deleted
 * @param deleteConfigurationInStore - a function which is called to delete the configuration
 * @param sendMessage - a function which is called to send a message
 * @returns the id of the configuration which was deleted
 */
export const deleteConfiguration = async ({
    id,
    deleteConfigurationInStore,
    sendMessage,
}: DeleteConfigurationPayload) => {
    const deletedId = await deleteConfigurationInStore(id);
    sendMessage(CONFIGURATION_CHANNEL, {
        type: MessageType.REFETCH,
    });
    return deletedId;
};
