import { NotFoundError } from "../../errors/notFoundError";
import { GetConfigurationByIdFunction } from "../interfaces/getConfigurationById.type";
import { convertConfigurationNullable } from "../ports/storeToDomain/convertConfiguration";

export interface GetConfigurationByIdPayload {
    id: string;
    getConfigurationByIdFromStore: GetConfigurationByIdFunction;
}

export const getConfigurationById = async ({ id, getConfigurationByIdFromStore }: GetConfigurationByIdPayload) => {
    const configuration = convertConfigurationNullable(await getConfigurationByIdFromStore(id));
    if (configuration === null) {
        throw new NotFoundError();
    }

    return configuration;
};
