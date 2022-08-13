import { BlockHeader } from "web3-eth";
import { Configuration } from "../types/Configuration.type";
import { Client } from "./client.type";

export interface TransactionProcessorOptions {
    configurations: Configuration[];
    client: Client;
}

export class TransactionProcessor {
    #configurations: Configuration[];
    #client: Client;

    constructor({ configurations, client }: TransactionProcessorOptions) {
        this.#configurations = configurations;
        this.#client = client;
    }

    public configurationChangeListener = (message: string) => {
        console.log(message);
    };

    public processTransactions = (data: BlockHeader) => {
        console.log(data);
    };
}
