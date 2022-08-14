import { Configuration } from "../../domain/Configuration.type";

export type SendNewConfigurationFunction = (channel: string, configuration: Configuration) => Promise<void>;
