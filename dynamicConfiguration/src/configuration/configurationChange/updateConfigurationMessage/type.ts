import { Configuration } from "../../domain/Configuration.type";
import { MessageType } from "../type";

export interface Message {
    payload: Configuration;
    type: MessageType.UPDATE;
}

export type SendUpdateConfigurationMessageFunction = (channel: string, message: Message) => Promise<void>;