import { Router, Request, Response } from "express";
import { createConfiguration as createConfigurationInDb } from "./../db/createConfiguration";
import { createConfiguration } from "../domain/createConfiguration";
import { validate } from "./util/configurationValidator";

const handler = async (req: Request, res: Response) => {
    const configurationPayload = req.body;
    validate(configurationPayload);

    const configuration = await createConfiguration(configurationPayload, createConfigurationInDb);
    res.send(configuration);
};

export const postConfigurationHandler = (router: Router) => {
    router.post("/api/configuration", handler);
};
