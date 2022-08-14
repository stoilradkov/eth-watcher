import { client } from "../../../publisher";
import { Payload } from "./type";

export const sendNewConfiguration = async (channel: string, payload: Payload) => client.publish(channel, payload);
