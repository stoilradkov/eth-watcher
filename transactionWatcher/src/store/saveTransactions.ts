import { Model, ModelStatic } from "sequelize/types";
import { TransactionAttributes } from "./models/Transaction.type";

export const getSaveTransactions = (
    transactionModel: ModelStatic<Model<TransactionAttributes, TransactionAttributes>>
) => {
    return async (transactionsPayload: TransactionAttributes[]) => {
        await transactionModel.bulkCreate(transactionsPayload);
        return true;
    };
};
