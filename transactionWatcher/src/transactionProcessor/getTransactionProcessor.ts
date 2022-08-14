import Web3 from "web3";
import { TransactionProcessor } from ".";
import { Configuration } from "../types/Configuration.type";
import { Store } from "./store.type";

export interface TransactionProcessorConfig {
    configurations: Configuration[];
    store: Store;
    web3: Web3;
    getConfigurations: () => Promise<Configuration[]>;
}

export const getTransactionProcessor = ({
    configurations,
    store,
    web3,
    getConfigurations,
}: TransactionProcessorConfig) =>
    new TransactionProcessor({
        configurations,
        store,
        web3,
        apiClient: {
            getConfigurations,
        },
    });
