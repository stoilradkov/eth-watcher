import { client } from "../../../publisher";
import { Configuration } from "../../domain/Configuration.type";

export const sendUpdateConfiguration = async (channel: string, configuration: Configuration) =>
    client.publish(channel, configuration);
