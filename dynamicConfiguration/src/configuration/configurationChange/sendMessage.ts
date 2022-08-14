import { client } from "../../publisher";
import { Message } from "./type";

/**
 * Sends a message to a specified channel
 * @param channel - the name of the channel
 * @param message - the message to be sent
 */
export const sendMessage = async (channel: string, message: Message) => client.publish(channel, message);
