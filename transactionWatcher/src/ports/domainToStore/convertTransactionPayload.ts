import { TransactionAttributes } from "../../store/models/Transaction.type";
import { TransactionPayload } from "../../transactionProcessor/Transaction.type";

export const convertTransactionPayloads = (transactionPayloads: TransactionPayload[]): TransactionAttributes[] =>
    transactionPayloads.map(({ transaction, id }) => ({ ...transaction, configurationId: id }));
