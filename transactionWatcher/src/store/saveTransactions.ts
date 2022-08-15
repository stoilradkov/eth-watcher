import { Model, ModelStatic } from "sequelize/types";
import { logError } from "../logger";
import { TransactionAttributes } from "./models/Transaction.type";

/**
 * Returns a function which creates and saves an array of transactions in the store
 * @param transactionModel - instance of transaction model
 * @returns a function which creates and saves an array of transactions in the store
 */
export const getSaveTransactions = (
    transactionModel: ModelStatic<Model<TransactionAttributes, TransactionAttributes>>
) => {
    return async (transactionsPayload: TransactionAttributes[]) => {
        try {
            await transactionModel.bulkCreate(transactionsPayload);
            return true;
        } catch (e) {
            logError("Could not save transactions", transactionModel, transactionsPayload, e);
        }
        return false;
    };
};
