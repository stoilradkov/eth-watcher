import { Sequelize } from "sequelize";
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

export const getClient = async (uri: string) => {
    const sequelizeClient = await getSequelizeClient(uri);
    const transactionModel = sequelizeClient.model("transaction");

    return {
        saveTransactions: async (transactionsPayload: TransactionAttributes[]) => {
            await transactionModel.bulkCreate(transactionsPayload.map(tx => ({ ...tx })));
            return true;
        },
    };
};
