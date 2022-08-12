import { Router, Request, Response } from "express";
import { BadRequestError } from "../../errors/badRequestError";
import { getConfiguratons } from "../domain/getConfigurations";
import { getConfigurations as getConfigurationsFromDb } from "../db/getConfigurations";

const handler = async (_: Request, res: Response) => {
    const configurations = await getConfiguratons(getConfigurationsFromDb);
    res.send(configurations);
};

export const getConfigurationsHandler = (router: Router) => {
    router.get("/api/configuration", handler);
};
