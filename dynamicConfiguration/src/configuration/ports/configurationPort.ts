import { ConfigurationDocument } from "../db/models/Configuration";
import { Configuration } from "../domain/Configuration.type";

export const portConfiguration = (configuration: ConfigurationDocument | null): Configuration | null => configuration;
