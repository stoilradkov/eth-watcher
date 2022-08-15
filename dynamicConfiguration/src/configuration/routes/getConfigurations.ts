import { Router, Request, Response } from "express";
import { getConfiguratons } from "../domain/getConfigurations";
import { getConfigurations as getConfigurationsFromStore } from "../store/getConfigurations";

/**
 * Forwards the request to the domain logic
 * and sends back a response of all configurations
 * @param _ - express request object
 * @param res - express response object
 */
const handler = async (_: Request, res: Response) => {
    const configurations = await getConfiguratons({ getConfigurationsFromStore });
    res.send(configurations);
};

export const getConfigurationsHandler = (router: Router) => {
    router.get("/api/configuration", handler);
};
