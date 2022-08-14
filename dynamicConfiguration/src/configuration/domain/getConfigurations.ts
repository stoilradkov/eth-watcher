import { convertConfigurations } from "./../ports/storeToDomain/convertConfigurations";
import { GetConfigurationsFunction } from "../interfaces/getConfigurations.type";

export interface GetConfigurationsPayload {
    getConfigurationsFromStore: GetConfigurationsFunction;
}

export const getConfiguratons = async ({ getConfigurationsFromStore }: GetConfigurationsPayload) => {
    const configurations = await getConfigurationsFromStore();
    return convertConfigurations(configurations);
};
