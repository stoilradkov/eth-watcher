import { Configuration } from "../domain/Configuration.type";

export type getConfigurationFunction = (id: string) => Promise<Configuration | null>;
