export enum MessageType {
    REFETCH = "REFETCH",
}

export interface Message {
    type: MessageType;
}

export type SendMessageFunction = (channel: string, message: Message) => Promise<void>;
