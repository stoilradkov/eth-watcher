import { ConfigurationDocument } from "../store/models/Configuration";
import { ConfigurationAttributes } from "../store/models/type";

export type UpdateConfigurationFunction = (
    id: string,
    configurationPayload: ConfigurationAttributes
) => Promise<ConfigurationDocument>;
