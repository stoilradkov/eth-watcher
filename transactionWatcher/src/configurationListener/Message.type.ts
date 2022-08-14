import { Configuration } from "../types/Configuration.type";

export enum MessageType {
    NEW = "NEW",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
}

export interface NewConfiguration {
    type: MessageType.NEW;
    payload: Configuration;
}

export interface UpdateConfiguration {
    type: MessageType.UPDATE;
    payload: Configuration;
}

export interface DeleteConfiguration {
    type: MessageType.DELETE;
    payload: { id: string };
}

export type Message = NewConfiguration | UpdateConfiguration | DeleteConfiguration;
