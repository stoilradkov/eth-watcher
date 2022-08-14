import { ConfigurationDocument } from "../../store/models/Configuration";
import { Configuration } from "../../domain/Configuration.type";

export const convertConfigurationNullable = (configuration: ConfigurationDocument | null): Configuration | null =>
    configuration;

export const convertConfiguration = (configuration: ConfigurationDocument): Configuration => configuration;
