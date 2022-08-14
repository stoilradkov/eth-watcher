import { client } from "../../../publisher";
import { Payload } from "./type";

export const sendDeleteConfiguration = async (channel: string, payload: Payload) => client.publish(channel, payload);
