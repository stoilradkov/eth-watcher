import { ConfigurationDocument } from "../store/models/Configuration";

export type GetConfigurationsFunction = () => Promise<ConfigurationDocument[]>;
