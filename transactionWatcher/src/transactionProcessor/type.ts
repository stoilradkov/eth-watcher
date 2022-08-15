import Web3 from "web3";
import { Configuration } from "../types/Configuration.type";
import { Api } from "./api.type";
import { Store } from "./store.type";

export interface TransactionProcessorOptions {
    configurations: Configuration[];
    store: Store;
    web3: Web3;
    apiClient: Api;
}
