import { Router, Request, Response } from "express";
import { BadRequestError } from "../../errors/badRequestError";
import { getConfiguratons } from "../domain/getConfigurations";
import { getConfigurations as getConfigurationsFromDb } from "../db/getConfigurations";

const handler = async (req: Request, res: Response) => {
    const configuration = await getConfiguratons(getConfigurationsFromDb);
    res.send(configuration);
};

export const getConfigurationsHandler = (router: Router) => {
    router.get("/api/configuration", handler);
};
