import { Configuration } from "../../domain/Configuration.type";
import { ConfigurationDocument } from "../../store/models/Configuration";

export const convertConfigurations = (configurations: ConfigurationDocument[]): Configuration[] => configurations;
