import { NotFoundError } from "../../errors/notFoundError";
import { GetConfigurationByIdFunction } from "../interfaces/getConfigurationById.type";

export const getConfiguratonById = async (id: string, getConfigurationById: GetConfigurationByIdFunction) => {
    const configuration = await getConfigurationById(id);
    if (configuration === null) {
        return { testing: "asd" };
        // throw new NotFoundError();
    }
    return configuration;
};
