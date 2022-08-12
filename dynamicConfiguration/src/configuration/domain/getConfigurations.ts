import { GetConfigurationsFunction } from "../interfaces/getConfigurations.type";

export const getConfiguratons = async (getConfigurations: GetConfigurationsFunction) => {
    const configurations = await getConfigurations();
    return configurations;
};
