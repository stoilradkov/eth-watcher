import { Configuration } from "../../domain/Configuration.type";
import { ConfigurationAttributes } from "../../store/models/type";

export const convertConfigurationPayloadNullable = (
    configurationPayload: Configuration | null
): ConfigurationAttributes | null => configurationPayload;

export const convertConfigurationPayload = (configurationPayload: Configuration): ConfigurationAttributes =>
    configurationPayload;
