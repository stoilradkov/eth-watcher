import { Router, Request, Response } from "express";
import { getConfiguratons } from "../domain/getConfigurations";
import { getConfigurations as getConfigurationsFromStore } from "../store/getConfigurations";

const handler = async (_: Request, res: Response) => {
    const configurations = await getConfiguratons({ getConfigurationsFromStore });
    res.send(configurations);
};

export const getConfigurationsHandler = (router: Router) => {
    router.get("/api/configuration", handler);
};
