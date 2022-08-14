import { convertConfigurations } from "./../ports/storeToDomain/convertConfigurations";
import { GetConfigurationsFunction } from "../interfaces/getConfigurations.type";

export interface GetConfigurationsPayload {
    getConfigurationsFromStore: GetConfigurationsFunction;
}

/**
 * Retrieves all configurations from the database
 * @param getConfigurationsFromStore - a function which is called to retrieve all configurations
 * @returns an array of configurations
 */
export const getConfiguratons = async ({ getConfigurationsFromStore }: GetConfigurationsPayload) => {
    const configurations = await getConfigurationsFromStore();
    return convertConfigurations(configurations);
};
