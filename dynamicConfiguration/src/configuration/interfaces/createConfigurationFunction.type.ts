import { Configuration } from "../domain/Configuration.type";

export type CreateConfigurationFunction = (configurationPayload: Configuration) => Promise<Configuration>;
