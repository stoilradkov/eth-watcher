import { Sequelize } from "sequelize";
import { SaveTransactionPayload } from "../transactionProcessor/client.type";
import * as models from "./models";

const getSequelizeClient = async (uri: string) => {
    console.log(uri);
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
        saveTransactions: async (transactionsPayload: SaveTransactionPayload[]) => {
            await transactionModel.bulkCreate(
                transactionsPayload.map(({ transaction, id }) => ({ ...transaction, configurationId: id }))
            );
            return true;
        },
    };
};
