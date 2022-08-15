import { Sequelize } from "sequelize";
import { Store } from "../transactionProcessor/store.type";
import * as models from "./models";
import { getSaveTransactions } from "./saveTransactions";

/**
 * Registers all models created and returns a sequelize client
 * @param uri - uri to which the client to connect to
 * @returns an instance of a sequelize client
 */
const getSequelizeClient = async (uri: string) => {
    const client = new Sequelize(uri);
    await client.authenticate();

    const allModels = Object.values(models);
    for (const model of allModels) {
        await model(client);
    }

    return client;
};

/**
 * Returns a store implementation
 * @param uri - uri to which the store client should connect to
 * @returns an implementation of a store
 */
export const getStore = async (uri: string): Promise<Store> => {
    const client = await getSequelizeClient(uri);
    return {
        saveTransactions: getSaveTransactions(client.model("transaction")),
    };
};
