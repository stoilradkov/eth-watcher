import { Configuration } from "./models/Configuration";

/**
 * Retrieves all configurations from the database
 * @returns an array of configurations
 */
export const getConfigurations = async () => {
    const configurations = await Configuration.find({});
    return configurations;
};
