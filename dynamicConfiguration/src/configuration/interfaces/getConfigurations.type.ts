import { Configuration } from "../domain/Configuration.type";

export type GetConfigurationsFunction = () => Promise<Configuration[]>;
