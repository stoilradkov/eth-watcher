import { Configuration } from "../types/Configuration.type";
import { Api } from "./api";

export const getConfigurations = async (apiClient: Api, path: string) => {
    return async () => {
        const { data, error } = await apiClient.get<Configuration[]>(path);
        if (error !== null) {
            return [];
        }
        return data;
    };
};
