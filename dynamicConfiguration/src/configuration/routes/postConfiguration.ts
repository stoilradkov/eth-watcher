import { Router, Request, Response } from "express";
import { sendNewConfiguration } from "../configurationChange/newConfiguration/sendNewConfiguration";
import { createConfiguration as createConfigurationInDb } from "./../db/createConfiguration";
import { createConfiguration } from "../domain/createConfiguration";
import { validate } from "./util/configurationValidator";

const handler = async (req: Request, res: Response) => {
    const configurationPayload = req.body;
    validate(configurationPayload);

    const configuration = await createConfiguration({
        configurationPayload,
        createConfigurationFunction: createConfigurationInDb,
        sendNewConfiguration,
    });
    res.send(configuration);
};

export const postConfigurationHandler = (router: Router) => {
    router.post("/api/configuration", handler);
};
