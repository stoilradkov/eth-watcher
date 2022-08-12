export enum StringFilter {
    EQUAL = "EQUAL",
    CONTAINS = "CONTAINS",
}
export enum NumberFilter {
    EQUAL = "EQUAL",
    LESS_THAN = "LESS_THAN",
    GREATER_THAN = "GREATER_THAN",
}

export interface StringFilterType {
    value: string;
    filterType: StringFilter;
}

export interface NumberFilterType {
    value: number;
    filterType: NumberFilter;
}

export interface Configuration {
    configurationName: string;
    blockHash: StringFilterType;
    blockNumber: NumberFilterType;
    chainId: NumberFilterType;
    from: StringFilterType;
    to: StringFilterType;
    gas: NumberFilterType;
    gasPrice: NumberFilterType;
    hash: StringFilterType;
    input: StringFilterType;
    transactionIndex: NumberFilterType;
    value: NumberFilterType;
}
