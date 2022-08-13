export interface Transaction {
    blockHash?: string;
    blockNumber?: number;
    from: string;
    gas: number;
    gasPrice: string;
    hash: string;
    input: string;
    nonce: number;
    transactionIndex?: number;
    to?: string;
    value: string;
    configurationId: string;
}
