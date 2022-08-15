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
import { TransactionProcessorOptions } from "./type";

/**
 * Listens for and filters transactions based on a list of configurations
 */
export class TransactionProcessor {
    #configurations: Configuration[];
    #store: Store;
    #web3: Web3;
    #apiClient: Api;

    /**
     * @constructor
     *  @param configurations - list of configurations
     *  @param store - store implementation
     *  @param web3 - web3 instance
     *  @param apiClient - implementation of an api client
     */
    constructor({ configurations, store, web3, apiClient }: TransactionProcessorOptions) {
        this.#configurations = configurations;
        this.#store = store;
        this.#web3 = web3;
        this.#apiClient = apiClient;
    }

    /**
     * Handles a message received from external subscriber.
     * If the message is of type 'refetch', the list of configurations is refetched.
     * @param message - message received
     */
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

    /**
     * Retrieves a list of configurations and overwrites the current one.
     */
    private updateConfigurations = async () => {
        const configurations = await this.#apiClient.getConfigurations();
        this.#configurations = configurations;
    };

    /**
     * Receives a blockHeader and filters the transcations in it
     * @param blockHeader - block header which is received
     */
    public receiveBlockHeader = async (blockHeader: BlockHeader) => {
        logInfo("Received block header", blockHeader);
        try {
            const block = await this.#web3.eth.getBlock(blockHeader.hash, true);
            this.processTransactions(block.transactions);
        } catch (e) {
            logError("Error while trying to get a block", blockHeader, e);
        }
    };

    /**
     * Filters transactions based on the available configurations and
     * stores them in the provided store
     * @param transactions - an array of transactions to be filtered
     */
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

    /**
     * Receives a transaction and tries to match it against all configurations
     * @param transaction - the transaction receieved
     * @returns object containing the transaction received and the id of the matching config or null
     * if no config matched the transaction
     */
    private mapTransaction = (transaction: Transaction) => {
        const matchingConfig = this.#configurations.find(config => this.configMatchesTransaction(config, transaction));
        return { id: matchingConfig?.id, transaction };
    };

    private filterMatchedTransactions = ({ id }: { id?: string }) => id !== undefined;

    /**
     * Checks if all keys of the config match the given transaction
     * @param config - the provided config
     * @param transaction - the provided transaction
     * @returns true if the config matches the transaction, false otherwise
     */
    private configMatchesTransaction = (config: Configuration, transaction: Transaction) => {
        const filtersKeys = this.getTransactionKeysFromConfig(config);
        return this.matchesAllFilters(filtersKeys, config, transaction);
    };

    /**
     * Excludes config keys which are not filters
     * @param config - the provided config
     * @returns a filtered list of config keys
     */
    private getTransactionKeysFromConfig = (config: Configuration) =>
        Object.keys(config).filter(key => key !== "id" && key !== "configurationName");

    /**
     * Checks if a config matches a transaction based on all config keys
     * @param filterKeys - keys which should me matched
     * @param config - the config containing the keys
     * @param transaction - the transaction being checked
     * @returns true if the transaction matches the config, false otherwise
     */
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

    /**
     * Checks if the provided filter matches the transaction value
     * @param transactionValue - the value to be checked
     * @param filterRule - the provided filter
     * @returns true if the filter is matched, false otherwise
     */
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
