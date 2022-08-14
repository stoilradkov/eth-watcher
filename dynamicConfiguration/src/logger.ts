import logger from "loglevel";

const getTime = () => new Date().toISOString();

const formatMessage = (level: "INFO" | "WARN" | "ERROR") => `[${level}]-[${getTime()}]`;

export const logInfo = (...messages: unknown[]) => {
    logger.info(formatMessage("INFO"), messages);
};

export const logWarn = (...messages: unknown[]) => {
    logger.warn(formatMessage("WARN"), messages);
};

export const logError = (...messages: unknown[]) => {
    logger.error(formatMessage("ERROR"), messages);
};
