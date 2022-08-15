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

/**
 * Creates and returns an instance of a transaction processor
 *  @param configurations - list of configurations
 *  @param store - store implementation
 *  @param web3 - web3 instance
 *  @param apiClient - implementation of an api client
 * @returns a new transaction processor instance
 */
export const getTransactionProcessor = ({ configurations, store, web3, apiClient }: TransactionProcessorConfig) =>
    new TransactionProcessor({
        configurations,
        store,
        web3,
        apiClient,
    });
