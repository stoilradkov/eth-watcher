import { SendDeleteConfigurationFunction } from "../configurationChange/deleteConfiguration/type";
import { MessageType } from "../configurationChange/type";
import { DeleteConfigurationFunction } from "../interfaces/deleteConfiguration.type";
import { CONFIGURATION_CHANNEL } from "./configurationChannel";

export interface DeleteConfigurationPayload {
    id: string;
    deleteConfigurationFunction: DeleteConfigurationFunction;
    sendDeleteConfiguration: SendDeleteConfigurationFunction;
}

export const deleteConfiguration = async ({
    id,
    deleteConfigurationFunction,
    sendDeleteConfiguration,
}: DeleteConfigurationPayload) => {
    const deletedId = await deleteConfigurationFunction(id);
    sendDeleteConfiguration(CONFIGURATION_CHANNEL, {
        payload: {
            id: deletedId,
        },
        type: MessageType.DELETE,
    });
    return deletedId;
};
