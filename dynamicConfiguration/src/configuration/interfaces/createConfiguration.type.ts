import { ConfigurationAttributes } from "../store/models/type";
import { ConfigurationDocument } from "../store/models/Configuration";

export type CreateConfigurationFunction = (
    configurationPayload: ConfigurationAttributes
) => Promise<ConfigurationDocument>;
