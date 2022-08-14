import { MessageType } from "../configurationChange/type";
import { SendUpdateConfigurationFunction } from "../configurationChange/updateConfiguration/type";
import { UpdateConfigurationFunction } from "../interfaces/updateConfiguration.type";
import { Configuration } from "./Configuration.type";
import { CONFIGURATION_CHANNEL } from "./configurationChannel";

export interface UpdateConfigurationPayload {
    id: string;
    configurationPayload: Configuration;
    updateConfigurationFunction: UpdateConfigurationFunction;
    sendUpdateConfiguration: SendUpdateConfigurationFunction;
}

export const updateConfiguration = async ({
    id,
    configurationPayload,
    updateConfigurationFunction,
    sendUpdateConfiguration,
}: UpdateConfigurationPayload) => {
    const updatedConfiguration = await updateConfigurationFunction(id, configurationPayload);
    sendUpdateConfiguration(CONFIGURATION_CHANNEL, {
        payload: updatedConfiguration,
        type: MessageType.UPDATE,
    });
    return updatedConfiguration;
};
