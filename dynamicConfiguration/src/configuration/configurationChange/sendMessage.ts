import { client } from "../../publisher";
import { Message } from "./type";

export const sendMessage = async (channel: string, message: Message) => client.publish(channel, message);
