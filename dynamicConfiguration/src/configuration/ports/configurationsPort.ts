import { ConfigurationDocument } from "../db/models/Configuration";
import { Configuration } from "../domain/Configuration.type";

export const portConfigurations = (configurations: ConfigurationDocument[]): Configuration[] => configurations;
