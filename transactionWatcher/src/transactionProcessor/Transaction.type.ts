export interface Transaction {
    blockHash?: string | null;
    blockNumber?: number | null;
    from: string;
    gas: number;
    gasPrice: string;
    hash: string;
    input: string;
    nonce: number;
    transactionIndex?: number | null;
    to?: string | null;
    value: string;
}
export interface TransactionPayload {
    transaction: Transaction;
    id: string;
}
