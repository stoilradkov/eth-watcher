import * as redis from "redis";
import { logError, logInfo } from "../logger";

export interface PublisherConfig {
    url: string;
}

/**
 * Represents a redis client publisher. The class can be used
 * to send messages to a specified topic.
 */
class Publisher {
    #publisher: redis.RedisClientType;
    #isConnected: boolean;
    #url: string;

    /**
     *
     * @constructor
     * @param config - required configuration for the publisher. Should contain at least
     * the url of the redis instance to which to connect to
     */
    constructor({ url }: PublisherConfig) {
        this.#publisher = redis.createClient({ url });
        this.#isConnected = false;
        this.#url = url;
    }

    /**
     * Publishes a message to the specified channel
     * @param channel - name of the channel
     * @param message - the message to be sent
     * @returns void
     */
    public publish = async <T>(channel: string, message: T) => {
        logInfo("Publishing message", message);
        if (!this.#isConnected) {
            try {
                await this.#publisher.connect();
                this.#isConnected = true;
            } catch (e) {
                logError("Error connecting to redis instance", e);
                try {
                    if (this.#publisher.isOpen) {
                        this.#publisher.quit();
                        this.#publisher = redis.createClient({ url: this.#url });
                    }
                } catch (e) {
                    logError("Error while disconnecting", e);
                }
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
