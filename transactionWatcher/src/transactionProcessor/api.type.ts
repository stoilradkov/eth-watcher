import { Configuration } from "../types/Configuration.type";

export interface Api {
    getConfigurations: () => Promise<Configuration[]>;
}
