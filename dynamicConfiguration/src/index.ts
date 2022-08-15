import logger from "loglevel";
import mongoose from "mongoose";
import { app } from "./app";
import { logError, logInfo } from "./logger";

const checkEnvironmentVars = () => {
    if (process.env.MONGO_URI === undefined) {
        throw new Error("MONGO_URI is not defined");
    }
    if (process.env.PORT === undefined) {
        throw new Error("PORT is not defined");
    }
};

/**
 * Sets logging level. Messages with level below the level
 * set will not be visible
 * @param level - level to set
 */
const setLoggingLevel = (level: "info" | "warn" | "error") => logger.setLevel(level);

const start = async () => {
    checkEnvironmentVars();
    setLoggingLevel(process.env.NODE_ENV === "development" ? "info" : "warn");

    await mongoose.connect(process.env.MONGO_URI ?? "");

    app.listen(process.env.PORT || 5000, () => {
        logInfo("Server listening on", process.env.PORT || 5000);
    });
};

process
    .on("unhandledRejection", (reason, p) => {
        logError(reason, "Unhandled Rejection at Promise", p);
    })
    .on("uncaughtException", err => {
        logError(err, "Uncaught Exception thrown");
        process.exit(1);
    });
start();
