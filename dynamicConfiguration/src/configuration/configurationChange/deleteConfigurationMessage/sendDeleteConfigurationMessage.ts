import { client } from "../../../publisher";
import { Message } from "./type";

export const sendDeleteConfigurationMessage = async (channel: string, message: Message) =>
    client.publish(channel, message);
