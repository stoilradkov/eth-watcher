import { Configuration } from "./models/Configuration";
import { ConfigurationAttributes } from "./models/type";

export const createConfiguration = async (configurationPayload: ConfigurationAttributes) => {
    const configuration = new Configuration(configurationPayload);
    await configuration.save();

    return configuration;
};
