import * as redis from "redis";

class Publisher {
    #publisher: redis.RedisClientType;
    #isConnected: boolean;

    constructor(url: string) {
        this.#publisher = redis.createClient({ url });
        this.#isConnected = false;
    }

    public publish = async <T>(channel: string, message: T) => {
        if (!this.#isConnected) {
            await this.#publisher.connect();
            this.#isConnected = true;
        }
        await this.#publisher.publish(channel, JSON.stringify(message));
    };
}
export const client = new Publisher(process.env.REDIS_URI ?? "");
