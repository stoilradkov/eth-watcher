import { Configuration } from "../../domain/Configuration.type";
import { ConfigurationDocument } from "../../store/models/Configuration";

/**
 * Converts an array of db models to an array of configuration objects
 * @param configuration - db models to be converted
 * @returns the configuration objects
 */
export const convertConfigurations = (configurations: ConfigurationDocument[]): Configuration[] => configurations;
