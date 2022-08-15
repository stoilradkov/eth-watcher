import { Model, ModelStatic, Sequelize } from "sequelize";
import { Store } from "../transactionProcessor/store.type";
import * as models from "./models";
import { TransactionAttributes } from "./models/Transaction.type";

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
 * Returns a function which creates and saves an array of transactions in the store
 * @param transactionModel - instance of transaction model
 * @returns a function which creates and saves an array of transactions in the store
 */
const getSaveTransactions = (transactionModel: ModelStatic<Model<TransactionAttributes, TransactionAttributes>>) => {
    return async (transactionsPayload: TransactionAttributes[]) => {
        await transactionModel.bulkCreate(transactionsPayload);
        return true;
    };
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
