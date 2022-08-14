import { MessageType, SendMessageFunction } from "../configurationChange/type";
import { DeleteConfigurationFunction } from "../interfaces/deleteConfiguration.type";
import { CONFIGURATION_CHANNEL } from "./configurationChannel";

export interface DeleteConfigurationPayload {
    id: string;
    deleteConfigurationInStore: DeleteConfigurationFunction;
    sendMessage: SendMessageFunction;
}

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
