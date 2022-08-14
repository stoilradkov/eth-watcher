import { ConfigurationDocument } from "../store/models/Configuration";

export type GetConfigurationByIdFunction = (id: string) => Promise<ConfigurationDocument | null>;
