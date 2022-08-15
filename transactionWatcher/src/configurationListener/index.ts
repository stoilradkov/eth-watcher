import * as redis from "redis";
import { logInfo, logWarn } from "../logger";

export type Listener<T> = (messagePayload: T) => void;

export interface Config<T> {
    url: string;
    channelName: string;
    listener: Listener<T>;
}

const parseMessage = <T>(message: string): T => JSON.parse(message);
/**
 * Initializes a redis client and subscribes to a channel
 * @param url - url to which to connect to
 * @param channelName - name of the channel to which to subscribe to
 * @param listener - function invoked when a message is received from the subscriber
 */
export const initializeSubscriber = async <T>({ url, channelName, listener }: Config<T>) => {
    const client = redis.createClient({
        url,
    });

    const subscriber = client.duplicate();
    try {
        await subscriber.connect();
        await subscriber.subscribe(channelName, (message: string) => {
            listener(parseMessage(message));
        });
        logInfo("Subscribed to redis instance");
    } catch (e) {
        logWarn("Could not connect to the redis instance. Hot reloading will not be available.", url, e);
    }
};
