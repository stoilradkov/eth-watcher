import { NotFoundError } from "../../errors/notFoundError";
import { GetConfigurationByIdFunction } from "../interfaces/getConfigurationById.type";
import { convertConfigurationNullable } from "../ports/storeToDomain/convertConfiguration";

export interface GetConfigurationByIdPayload {
    id: string;
    getConfigurationByIdFromStore: GetConfigurationByIdFunction;
}

/**
 * Retrieves a configuration by its id
 * @param id - the id of the configuration to be retrieved
 * @param getConfigurationByIdFromStore - a function which is called to retrieve the configuration by id
 * @throws NotFoundError if no configuration was found with the given id
 * @returns the configuration with that id
 */
export const getConfigurationById = async ({ id, getConfigurationByIdFromStore }: GetConfigurationByIdPayload) => {
    const configuration = convertConfigurationNullable(await getConfigurationByIdFromStore(id));
    if (configuration === null) {
        throw new NotFoundError();
    }

    return configuration;
};
