import { MessageType } from "../type";

export interface Payload {
    id: string;
}
export interface Message {
    payload: Payload;
    type: MessageType.DELETE;
}
export type SendDeleteConfigurationFunction = (channel: string, message: Message) => Promise<void>;
