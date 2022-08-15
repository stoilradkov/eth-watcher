import Web3 from "web3";
import { Subscription } from "web3-core-subscriptions";
import { BlockHeader } from "web3-eth";
import { logError, logInfo, logWarn } from "../logger";
import { SubscriptionType } from "./type";

export type SubscriptionHandlerFunction = (data: BlockHeader) => void;

/**
 * Provides a subscription method to subscribe to
 * a newBlockHeaders endpoint
 */
export class TransactionScanner {
    #web3Client: Web3;
    #subscription: Subscription<BlockHeader> | null;

    constructor(web3Client: Web3) {
        this.#web3Client = web3Client;
        this.#subscription = null;
    }

    /**
     * Subscribes to an endpoint
     * @param type - endpoint to which to subscribe to
     * @param subscriptionHandler - function which is invoked when a message is received
     */
    public subscribe = (type: SubscriptionType, subscriptionHandler: SubscriptionHandlerFunction) => {
        if (this.#subscription !== null) {
            logWarn("Tried to subscribe twice");
            return;
        }
        this.#subscription = this.#web3Client.eth.subscribe(type);
        this.#subscription.on("data", subscriptionHandler);
        this.#subscription.on("error", error => {
            logError("Subscription to newBlockHeaders failed", error);
        });
    };

    /**
     * Unsubscribes from a topic
     */
    public unsubscribe = () => {
        this.#subscription?.unsubscribe(error => {
            if (error !== null) {
                logError("Error during unsubscription", error);
                return;
            }
            logInfo("Unsubscribed successfully");
        });
    };
}
