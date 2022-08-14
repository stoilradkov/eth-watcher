import { Configuration } from "../../domain/Configuration.type";

export type SendUpdateConfigurationFunction = (channel: string, configuration: Configuration) => Promise<void>;
