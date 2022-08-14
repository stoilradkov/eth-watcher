import Web3 from "web3";
import { Api } from "./configurationApi/api";
import { getClient } from "./db/client";
import { initializeSubscriber } from "./configurationListener";
import { TransactionScanner } from "./transactionScanner";
import { TransactionProcessor } from "./transactionProcessor";
import { Configuration } from "./types/Configuration.type";

const init = async () => {
    const apiClient = new Api({ uri: process.env.CONFIGURATION_API_URI ?? "" });
    const dbClient = await getClient(process.env.POSTGRES_URI ?? "");
    const configurations = await apiClient.get<Configuration[]>("/api/configuration");
    console.log(configurations);
    const web3 = new Web3(
        new Web3.providers.WebsocketProvider(`wss://ropsten.infura.io/ws/v3/${process.env.INFURA_API_KEY}`)
    );
    const transactionProcessor = new TransactionProcessor({ configurations, client: dbClient, web3 });
    await initializeSubscriber(
        process.env.REDIS_URI ?? "",
        transactionProcessor.configurationChangeListener.bind(this)
    );
    const transactionScanner = new TransactionScanner(web3);
    transactionScanner.subscribe(transactionProcessor.receiveBlockHeader.bind(this));
};

init();
