import { Configuration } from "../../domain/Configuration.type";
import { ConfigurationAttributes } from "../../store/models/type";

/**
 * Converts configuration object which might be null to a db model
 * @param configurationPayload - payload to be converted
 * @returns a db model object or null
 */
export const convertConfigurationPayloadNullable = (
    configurationPayload: Configuration | null
): ConfigurationAttributes | null => configurationPayload;

/**
 * Converts configuration object which to a db model
 * @param configurationPayload - payload to be converted
 * @returns a db model object
 */
export const convertConfigurationPayload = (configurationPayload: Configuration): ConfigurationAttributes =>
    configurationPayload;
