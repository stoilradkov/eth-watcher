export const checkEnvironmentVars = () => {
    if (process.env.NODE_ENV === undefined) {
        throw new Error("Environment is not defined");
    }
    if (process.env.CONFIGURATION_API_URI === undefined) {
        throw new Error("Configuration api uri is not defined");
    }
    if (process.env.POSTGRES_URI === undefined) {
        throw new Error("Postgres uri is not defined");
    }
    if (process.env.REDIS_URI === undefined) {
        throw new Error("Redis uri is not defined");
    }
    if (process.env.INFURA_API_KEY === undefined) {
        throw new Error("Infura api key is not defined");
    }
    if (process.env.ETHEREUM_NETWORK === undefined) {
        throw new Error("Ethereum network is not defined");
    }
};
