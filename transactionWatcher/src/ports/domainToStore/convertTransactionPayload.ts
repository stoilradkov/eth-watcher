import { TransactionAttributes } from "../../store/models/Transaction.type";
import { TransactionPayload } from "../../transactionProcessor/Transaction.type";

/**
 * Converts an array of transaction objects to an array of transaction attributes
 * which are used by the store
 * @param transactionPayloads - transaction objects to be converted
 * @returns an array of transaction attributes
 */
export const convertTransactionPayloads = (transactionPayloads: TransactionPayload[]): TransactionAttributes[] =>
    transactionPayloads.map(({ transaction, id }) => ({ ...transaction, configurationId: id }));
