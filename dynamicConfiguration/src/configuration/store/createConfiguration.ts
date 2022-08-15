import { logInfo } from "../../logger";
import { Configuration } from "./models/Configuration";
import { ConfigurationAttributes } from "./models/type";

/**
 * Creates a new configuration and stores it in the database
 * @param configurationPayload - object containing the attributes of the configuration to be created
 * @returns the newly created configuration
 */
export const createConfiguration = async (configurationPayload: ConfigurationAttributes) => {
    logInfo("Creating configuration", configurationPayload);
    const configuration = new Configuration(configurationPayload);
    await configuration.save();

    return configuration;
};
