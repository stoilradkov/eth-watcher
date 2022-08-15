import logger from "loglevel";

/**
 * Gets current time in ISO format
 */
const getTime = () => new Date().toISOString();

/**
 * Formats message in the form [LEVEL]-[TIME_IN_ISO_FORMAT] , for example
 * [INFO]-[2022-01-01T12:00:00.000Z]
 * @param level - log level
 * @returns the formatted string
 */
const formatMessage = (level: "INFO" | "WARN" | "ERROR") => `[${level}]-[${getTime()}]`;

/**
 * Logs messages with info level
 * @param messages - array of messages to be logged
 */
export const logInfo = (...messages: unknown[]) => {
    logger.info(formatMessage("INFO"), messages);
};

/**
 * Logs messages with warn level
 * @param messages - array of messages to be logged
 */
export const logWarn = (...messages: unknown[]) => {
    logger.warn(formatMessage("WARN"), messages);
};

/**
 * Logs messages with error level
 * @param messages - array of messages to be logged
 */
export const logError = (...messages: unknown[]) => {
    logger.error(formatMessage("ERROR"), messages);
};
