import { ConfigurationDocument } from "../../store/models/Configuration";
import { Configuration } from "../../domain/Configuration.type";

/**
 * Converts db model which might be null to a configuration object
 * @param configuration - db model to be converted
 * @returns a configuration object or null
 */
export const convertConfigurationNullable = (configuration: ConfigurationDocument | null): Configuration | null =>
    configuration?.toJSON() ?? null;

/**
 * Converts db model to a configuration object
 * @param configuration - db model to be converted
 * @returns a configuration object
 */
export const convertConfiguration = (configuration: ConfigurationDocument): Configuration => configuration.toJSON();
