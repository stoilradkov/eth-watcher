import * as redis from "redis";

export const CHANNEL_NAME = "CONFIGURATION|NEW";

export type Listener = (message: string) => void;

export const initializeSubscriber = async (url: string, listener: Listener) => {
    const client = redis.createClient({
        url,
    });

    const subscriber = client.duplicate();

    await subscriber.connect();

    await subscriber.subscribe(CHANNEL_NAME, listener);
};
