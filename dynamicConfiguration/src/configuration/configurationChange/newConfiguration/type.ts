import { Configuration } from "../../domain/Configuration.type";
import { MessageType } from "../type";

export interface Message {
    payload: Configuration;
    type: MessageType.NEW;
}

export type SendNewConfigurationFunction = (channel: string, message: Message) => Promise<void>;
