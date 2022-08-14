import { SendDeleteConfigurationMessageFunction } from "../configurationChange/deleteConfigurationMessage/type";
import { MessageType } from "../configurationChange/type";
import { DeleteConfigurationFunction } from "../interfaces/deleteConfiguration.type";
import { CONFIGURATION_CHANNEL } from "./configurationChannel";

export interface DeleteConfigurationPayload {
    id: string;
    deleteConfigurationInStore: DeleteConfigurationFunction;
    sendDeleteConfigurationMessage: SendDeleteConfigurationMessageFunction;
}

export const deleteConfiguration = async ({
    id,
    deleteConfigurationInStore,
    sendDeleteConfigurationMessage,
}: DeleteConfigurationPayload) => {
    const deletedId = await deleteConfigurationInStore(id);
    sendDeleteConfigurationMessage(CONFIGURATION_CHANNEL, {
        payload: {
            id: deletedId,
        },
        type: MessageType.DELETE,
    });
    return deletedId;
};
