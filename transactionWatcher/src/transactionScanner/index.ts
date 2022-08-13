import Web3 from "web3";
import { Subscription } from "web3-core-subscriptions";
import { BlockHeader } from "web3-eth";

export type SubscriptionHandlerFunction = (data: BlockHeader) => void;

export class TransactionScanner {
    #web3Client: Web3;
    #subscription: Subscription<BlockHeader> | null;

    constructor(web3Client: Web3) {
        this.#web3Client = web3Client;
        this.#subscription = null;
    }

    public subscribe = (subscriptionHandler: SubscriptionHandlerFunction) => {
        if (this.#subscription !== null) {
            return;
        }
        this.#subscription = this.#web3Client.eth.subscribe("newBlockHeaders", (error: Error) => {
            if (error !== null) {
                throw error;
            }
        });
        this.#subscription.on("data", subscriptionHandler);
        this.#subscription.on("error", error => {
            throw error;
        });
    };

    public unsubscribe = () => {
        this.#subscription?.unsubscribe(error => {
            if (error !== null) {
                throw error;
            }
        });
    };
}
