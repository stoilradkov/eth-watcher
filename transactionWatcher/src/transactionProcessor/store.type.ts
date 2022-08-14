import { TransactionAttributes } from "../store/models/Transaction.type";

export interface Store {
    saveTransactions: (transactionsPayload: TransactionAttributes[]) => Promise<boolean>;
}
