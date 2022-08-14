import { MessageType } from "../configurationChange/type";
import { SendUpdateConfigurationMessageFunction } from "../configurationChange/updateConfigurationMessage/type";
import { UpdateConfigurationFunction } from "../interfaces/updateConfiguration.type";
import { convertConfigurationPayload } from "../ports/domainToStore/convertConfigurationPayload";
import { convertConfiguration } from "../ports/storeToDomain/convertConfiguration";
import { Configuration } from "./Configuration.type";
import { CONFIGURATION_CHANNEL } from "./configurationChannel";

export interface UpdateConfigurationPayload {
    id: string;
    configurationPayload: Configuration;
    updateConfigurationInStore: UpdateConfigurationFunction;
    sendUpdateConfigurationMessage: SendUpdateConfigurationMessageFunction;
}

export const updateConfiguration = async ({
    id,
    configurationPayload,
    updateConfigurationInStore,
    sendUpdateConfigurationMessage,
}: UpdateConfigurationPayload) => {
    const convertedConfigurationPayload = convertConfigurationPayload(configurationPayload);
    const updatedConfiguration = convertConfiguration(
        await updateConfigurationInStore(id, convertedConfigurationPayload)
    );

    sendUpdateConfigurationMessage(CONFIGURATION_CHANNEL, {
        payload: updatedConfiguration,
        type: MessageType.UPDATE,
    });

    return updatedConfiguration;
};
