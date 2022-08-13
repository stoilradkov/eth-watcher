import { Transaction } from "./Transaction.type";

export interface Client {
    saveTransaction: (transaction: Transaction, configurationId: string) => Promise<boolean>;
}
