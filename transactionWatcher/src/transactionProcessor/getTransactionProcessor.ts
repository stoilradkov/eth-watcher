import Web3 from "web3";
import { TransactionProcessor } from ".";
import { Configuration } from "../types/Configuration.type";
import { Api } from "./api.type";
import { Store } from "./store.type";

export interface TransactionProcessorConfig {
    configurations: Configuration[];
    store: Store;
    web3: Web3;
    apiClient: Api;
}

export const getTransactionProcessor = ({ configurations, store, web3, apiClient }: TransactionProcessorConfig) =>
    new TransactionProcessor({
        configurations,
        store,
        web3,
        apiClient,
    });
