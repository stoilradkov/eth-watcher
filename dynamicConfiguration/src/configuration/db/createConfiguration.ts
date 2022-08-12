import { Configuration as ConfigurationType } from "../domain/Configuration.type";
import { portConfiguration } from "../ports/configurationPort";
import { Configuration } from "./models/Configuration";

export const createConfiguration = async (configurationPayload: ConfigurationType) => {
    const configuration = new Configuration(configurationPayload);
    await configuration.save();
    return portConfiguration(configuration);
};
