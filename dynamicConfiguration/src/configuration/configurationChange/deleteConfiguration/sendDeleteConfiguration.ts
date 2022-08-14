import { client } from "../../../publisher";
import { Message } from "./type";

export const sendDeleteConfiguration = async (channel: string, message: Message) => client.publish(channel, message);
