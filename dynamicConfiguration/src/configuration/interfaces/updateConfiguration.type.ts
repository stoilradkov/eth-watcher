import { Configuration } from "../domain/Configuration.type";

export type UpdateConfigurationFunction = (id: string, configurationPayload: Configuration) => Promise<Configuration>;
