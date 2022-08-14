import Web3 from "web3";
import { BlockHeader } from "web3-eth";
import { Message, MessageType } from "../configurationListener/Message.type";
import {
    Configuration,
    NumberFilter,
    NumberFilterType,
    StringFilter,
    StringFilterType,
} from "../types/Configuration.type";
import { isKeyInObject } from "../util/objectKey";
import { Client, SaveTransactionPayload } from "./client.type";
import { RawTransaction } from "./Transaction.type";

export interface TransactionProcessorOptions {
    configurations: Configuration[];
    client: Client;
    web3: Web3;
}

export class TransactionProcessor {
    #configurations: Configuration[];
    #client: Client;
    #web3: Web3;

    constructor({ configurations, client, web3 }: TransactionProcessorOptions) {
        this.#configurations = configurations;
        this.#client = client;
        this.#web3 = web3;
    }

    public configurationChangeListener = ({ type, payload }: Message) => {
        switch (type) {
            case MessageType.NEW:
                this.addNewConfiguration(payload);
                break;
            case MessageType.UPDATE:
                this.updateConfiguration(payload);
                break;
            case MessageType.DELETE:
                this.deleteConfiguration(payload);
                break;
            default:
                console.log("UNKNOWN TYPE", type);
                break;
        }
    };

    private addNewConfiguration = (configuration: Configuration) => {
        this.#configurations = [...this.#configurations, configuration];
    };

    private updateConfiguration = (configuration: Configuration) => {
        this.#configurations = this.#configurations.map(config =>
            config.id === configuration.id ? configuration : config
        );
    };

    private deleteConfiguration = ({ id }: { id: string }) => {
        this.#configurations = this.#configurations.filter(config => config.id !== id);
    };

    public receiveBlockHeader = async (blockHeader: BlockHeader) => {
        const block = await this.#web3.eth.getBlock(blockHeader.hash, true);
        this.processTransactions(block.transactions);
    };

    private processTransactions = async (transactions: RawTransaction[]) => {
        const matchedTransactions = transactions
            .map(this.mapTransaction)
            .filter(this.filterMatchedTransactions) as SaveTransactionPayload[];

        this.#client.saveTransactions(matchedTransactions);
    };

    private mapTransaction = (transaction: RawTransaction) => {
        const matchingConfig = this.#configurations.find(config => this.configMatchesTransaction(config, transaction));
        return { id: matchingConfig?.id, transaction };
    };

    private filterMatchedTransactions = ({ id }: { id?: string }) => id !== undefined;

    private configMatchesTransaction = (config: Configuration, transaction: RawTransaction) => {
        const filtersKeys = this.getTransactionKeysFromConfig(config);
        return this.matchesAllFilters(filtersKeys, config, transaction);
    };

    private getTransactionKeysFromConfig = (config: Configuration) =>
        Object.keys(config).filter(key => key !== "id" && key !== "configurationName");

    private matchesAllFilters = (filterKeys: string[], config: Configuration, transaction: RawTransaction) => {
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
        console.log("FILTER NOT MATCHED", filterType);
        return false;
    }
}
