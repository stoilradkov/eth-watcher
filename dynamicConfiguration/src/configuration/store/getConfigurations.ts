import { Configuration } from "./models/Configuration";

export const getConfigurations = async () => {
    const configurations = await Configuration.find({});
    return configurations;
};
