import { ConfigurationDocument } from "../db/models/Configuration";
import { Configuration } from "../domain/Configuration.type";

export const portConfigurationNullable = (configuration: ConfigurationDocument | null): Configuration | null =>
    configuration;

export const portConfiguration = (configuration: ConfigurationDocument): Configuration => configuration;
