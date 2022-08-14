import { Model, ModelStatic, Sequelize } from "sequelize";
import { Store } from "../transactionProcessor/store.type";
import * as models from "./models";
import { TransactionAttributes } from "./models/Transaction.type";

const getSequelizeClient = async (uri: string) => {
    const client = new Sequelize(uri);
    await client.authenticate();

    const allModels = Object.values(models);
    for (const model of allModels) {
        await model(client);
    }

    return client;
};

const getSaveTransactions = (transactionModel: ModelStatic<Model<TransactionAttributes, TransactionAttributes>>) => {
    return async (transactionsPayload: TransactionAttributes[]) => {
        await transactionModel.bulkCreate(transactionsPayload);
        return true;
    };
};

export const getStore = async (uri: string): Promise<Store> => {
    const client = await getSequelizeClient(uri);
    return {
        saveTransactions: getSaveTransactions(client.model("transaction")),
    };
};
