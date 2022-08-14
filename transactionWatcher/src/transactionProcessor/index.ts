import Web3 from "web3";
import { BlockHeader } from "web3-eth";
import { Message, MessageType } from "../configurationListener/Message.type";
import { logError, logInfo, logWarn } from "../logger";
import { convertTransactionPayloads } from "../ports/domainToStore/convertTransactionPayload";
import {
    Configuration,
    NumberFilter,
    NumberFilterType,
    StringFilter,
    StringFilterType,
} from "../types/Configuration.type";
import { isKeyInObject } from "../util/objectKey";
import { Api } from "./api.type";
import { Store } from "./store.type";
import { Transaction, TransactionPayload } from "./Transaction.type";

export interface TransactionProcessorOptions {
    configurations: Configuration[];
    store: Store;
    web3: Web3;
    apiClient: Api;
}

export class TransactionProcessor {
    #configurations: Configuration[];
    #store: Store;
    #web3: Web3;
    #apiClient: Api;

    constructor({ configurations, store, web3, apiClient }: TransactionProcessorOptions) {
        this.#configurations = configurations;
        this.#store = store;
        this.#web3 = web3;
        this.#apiClient = apiClient;
    }

    public configurationChangeListener = async ({ type }: Message) => {
        logInfo("Received message", type);
        switch (type) {
            case MessageType.REFETCH:
                await this.updateConfigurations();
                break;
            default:
                logWarn("Unknown message type", type);
                break;
        }
        logInfo("Updated configuration list", this.#configurations);
    };

    private updateConfigurations = async () => {
        const configurations = await this.#apiClient.getConfigurations();
        this.#configurations = configurations;
    };

    public receiveBlockHeader = async (blockHeader: BlockHeader) => {
        logInfo("Received block header", blockHeader);
        const block = await this.#web3.eth.getBlock(blockHeader.hash, true);
        this.processTransactions(block.transactions);
    };

    private processTransactions = async (transactions: Transaction[]) => {
        const matchedTransactions = transactions
            .map(this.mapTransaction)
            .filter(this.filterMatchedTransactions) as TransactionPayload[];

        if (matchedTransactions.length !== 0) {
            logInfo("Saving matched transactions", matchedTransactions);
            try {
                this.#store.saveTransactions(convertTransactionPayloads(matchedTransactions));
            } catch (e) {
                logError("Could not save transactions", matchedTransactions, e);
            }
        }
    };

    private mapTransaction = (transaction: Transaction) => {
        const matchingConfig = this.#configurations.find(config => this.configMatchesTransaction(config, transaction));
        return { id: matchingConfig?.id, transaction };
    };

    private filterMatchedTransactions = ({ id }: { id?: string }) => id !== undefined;

    private configMatchesTransaction = (config: Configuration, transaction: Transaction) => {
        const filtersKeys = this.getTransactionKeysFromConfig(config);
        return this.matchesAllFilters(filtersKeys, config, transaction);
    };

    private getTransactionKeysFromConfig = (config: Configuration) =>
        Object.keys(config).filter(key => key !== "id" && key !== "configurationName");

    private matchesAllFilters = (filterKeys: string[], config: Configuration, transaction: Transaction) => {
        for (const filterKey of filterKeys) {
            if (!isKeyInObject(filterKey, transaction) || !isKeyInObject(filterKey, config)) {
                return false;
            }

            const transactionValue = transaction[filterKey];
            const filterRule = config[filterKey] as StringFilterType | NumberFilterType;
            if (
                transactionValue === undefined ||
                transactionValue === null ||
                !this.isFilterMatched(transactionValue, filterRule)
            ) {
                return false;
            }
        }
        return true;
    };

    private isFilterMatched(transactionValue: string | number, filterRule: StringFilterType | NumberFilterType) {
        const { value, filterType } = filterRule;
        switch (filterType) {
            case StringFilter.EQUAL:
                return transactionValue === value;
            case StringFilter.CONTAINS:
                return (transactionValue as string).toLowerCase().includes(value.toLowerCase());
            case NumberFilter.LESS_THAN:
                return transactionValue < value;
            case NumberFilter.GREATER_THAN:
                return transactionValue > value;
        }
        logWarn("Unknown filter type", transactionValue, value, filterType);
        return false;
    }
}
