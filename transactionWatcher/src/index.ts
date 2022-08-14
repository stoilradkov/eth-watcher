import Web3 from "web3";
import logger from "loglevel";
import { Api } from "./configurationApi/api";
import { initializeSubscriber } from "./configurationListener";
import { TransactionScanner } from "./transactionScanner";
import { TransactionProcessor } from "./transactionProcessor";
import { logError, logInfo } from "./logger";
import { getConfigurations } from "./configurationApi/getConfigurations";
import { getStore } from "./store/getStore";
import { Configuration } from "./types/Configuration.type";
import { Store } from "./transactionProcessor/store.type";

const checkEnvironmentVars = () => {
    if (process.env.NODE_ENV === undefined) {
        throw new Error("Environment is not defined");
    }
    if (process.env.CONFIGURATION_API_URI === undefined) {
        throw new Error("Configuration api uri is not defined");
    }
    if (process.env.POSTGRES_URI === undefined) {
        throw new Error("Postgres uri is not defined");
    }
    if (process.env.REDIS_URI === undefined) {
        throw new Error("Redis uri is not defined");
    }
    if (process.env.INFURA_API_KEY === undefined) {
        throw new Error("Infura api key is not defined");
    }
    if (process.env.ETHEREUM_NETWORK === undefined) {
        throw new Error("Ethereum network is not defined");
    }
};

const setLoggingLevel = (level: "info" | "warn" | "error") => logger.setLevel(level);

const getWeb3Instance = (host: string) => new Web3(new Web3.providers.WebsocketProvider(host));

const getTransactionProcessor = (configurations: Configuration[], store: Store, web3: Web3) =>
    new TransactionProcessor({
        configurations,
        store,
        web3,
    });

const start = async () => {
    checkEnvironmentVars();
    setLoggingLevel(process.env.NODE_ENV === "development" ? "info" : "warn");

    const apiClient = new Api({ uri: process.env.CONFIGURATION_API_URI ?? "" });
    const [configurations, store] = await Promise.all([
        getConfigurations(apiClient, "/api/configuration"),
        getStore(process.env.POSTGRES_URI ?? ""),
    ]);
    logInfo("Initial configurations", configurations);

    const web3 = getWeb3Instance(`wss://${process.env.ETHEREUM_NETWORK}.infura.io/ws/v3/${process.env.INFURA_API_KEY}`);
    const transactionProcessor = getTransactionProcessor(configurations, store, web3);

    await initializeSubscriber(
        process.env.REDIS_URI ?? "",
        transactionProcessor.configurationChangeListener.bind(this)
    );

    const transactionScanner = new TransactionScanner(web3);
    transactionScanner.subscribe(transactionProcessor.receiveBlockHeader.bind(this));
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
