import * as redis from "redis";

export const CHANNEL_NAME = "CONFIGURATION";

export type Listener<T> = (messagePayload: T) => void;

const parseMessage = <T>(message: string): T => JSON.parse(message);

export const initializeSubscriber = async <T>(url: string, listener: Listener<T>) => {
    const client = redis.createClient({
        url,
    });

    const subscriber = client.duplicate();

    await subscriber.connect();
    await subscriber.subscribe(CHANNEL_NAME, (message: string) => {
        listener(parseMessage(message));
    });
};
