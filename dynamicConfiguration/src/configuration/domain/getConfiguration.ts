import { NotFoundError } from "../../errors/notFoundError";
import { getConfigurationFunction } from "../interfaces/getConfiguration.type";

export const getConfiguraton = async (id: string, getConfigurationById: getConfigurationFunction) => {
    const configuration = await getConfigurationById(id);
    if (configuration === null) {
        return { testing: "asd" };
        // throw new NotFoundError();
    }
    return configuration;
};
