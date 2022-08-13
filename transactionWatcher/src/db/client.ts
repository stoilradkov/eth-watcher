import { Sequelize } from "sequelize";
import { Transaction } from "../transcationProcessor/Transaction.type";
import * as models from "./models";

const getSequelizeClient = async (uri: string) => {
    console.log(uri);
    const client = new Sequelize(uri);
    Object.values(models).forEach(model => model(client));
    await client.authenticate();
    return client;
};

export const getClient = async (uri: string) => {
    const sequelizeClient = await getSequelizeClient(uri);
    const transactionModel = sequelizeClient.model("transaction");
    return {
        saveTransaction: async (transaction: Transaction, configurationId: string) => {
            await transactionModel.create({ ...transaction, configurationId });
            return true;
        },
    };
};
