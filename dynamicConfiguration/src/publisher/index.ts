import * as redis from "redis";
import { logError, logInfo } from "../logger";

export interface PublisherConfig {
    url: string;
}
class Publisher {
    #publisher: redis.RedisClientType;
    #isConnected: boolean;

    constructor({ url }: PublisherConfig) {
        this.#publisher = redis.createClient({ url });
        this.#isConnected = false;
    }

    public publish = async <T>(channel: string, message: T) => {
        logInfo("Publishing message", message);
        if (!this.#isConnected) {
            try {
                await this.#publisher.connect();
                this.#isConnected = true;
            } catch (e) {
                logError("Error connecting to redis instance", e);
                return;
            }
        }
        try {
            await this.#publisher.publish(channel, JSON.stringify(message));
        } catch (e) {
            logError("Error publishing message", channel, message, e);
        }
    };
}
export const client = new Publisher({ url: process.env.REDIS_URI ?? "" });
