import Web3 from "web3";
import logger from "loglevel";
import { Api } from "./configurationApi/api";
import { initializeSubscriber } from "./configurationListener";
import { TransactionScanner } from "./transactionScanner";
import { logError, logInfo } from "./logger";
import { getConfigurations } from "./configurationApi/getConfigurations";
import { getStore } from "./store/getStore";
import { checkEnvironmentVars } from "./checkEnvironment";
import { getTransactionProcessor } from "./transactionProcessor/getTransactionProcessor";

/**
 * Sets logging level. Messages with level below the level
 * set will not be visible
 * @param level - level to set
 */
const setLoggingLevel = (level: "info" | "warn" | "error") => logger.setLevel(level);

/**
 * Get's a web3 istance initialized with a websocket provider
 * @param host - provider's url
 * @returns a web3 instance
 */
const getWeb3Instance = (host: string) => new Web3(new Web3.providers.WebsocketProvider(host));

const start = async () => {
    checkEnvironmentVars();
    setLoggingLevel(process.env.NODE_ENV === "development" ? "info" : "warn");

    const apiClient = new Api({ uri: process.env.CONFIGURATION_API_URI ?? "" });
    const getConfigurationsCallback = await getConfigurations(apiClient, "/api/configuration");

    const [configurations, store] = await Promise.all([
        getConfigurationsCallback(),
        getStore(process.env.POSTGRES_URI ?? ""),
    ]);
    logInfo("Initial configurations", configurations);

    const web3 = getWeb3Instance(`wss://${process.env.ETHEREUM_NETWORK}.infura.io/ws/v3/${process.env.INFURA_API_KEY}`);
    const transactionProcessor = getTransactionProcessor({
        configurations,
        store,
        web3,
        apiClient: { getConfigurations: getConfigurationsCallback },
    });

    await initializeSubscriber({
        channelName: "CONFIGURATION",
        url: process.env.REDIS_URI ?? "",
        listener: transactionProcessor.configurationChangeListener.bind(this),
    });

    const transactionScanner = new TransactionScanner(web3);
    transactionScanner.subscribe("newBlockHeaders", transactionProcessor.receiveBlockHeader.bind(this));
};

process
    .on("uncaughtException", err => {
        logError("Uncaught Exception thrown", err);
        process.exit(1);
    })
    .on("unhandledRejection", (reason, p) => {
        logError("Unhandled promise rejection", reason, p);
    });

start();
