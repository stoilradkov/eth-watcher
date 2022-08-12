import { Configuration } from "../domain/Configuration.type";

export type GetConfigurationByIdFunction = (id: string) => Promise<Configuration | null>;
