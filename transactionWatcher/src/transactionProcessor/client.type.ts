import { Transaction } from "./Transaction.type";

export interface SaveTransactionPayload {
    transaction: Transaction;
    id: string;
}

export interface Client {
    saveTransactions: (transactionsPayload: SaveTransactionPayload[]) => Promise<boolean>;
}
