import { Router, Request, Response } from "express";
import { createConfiguration as createConfigurationInStore } from "../store/createConfiguration";
import { createConfiguration } from "../domain/createConfiguration";
import { validate } from "./validation/configurationValidator";
import { sendMessage } from "../configurationChange/sendMessage";

const handler = async (req: Request, res: Response) => {
    const configurationPayload = req.body;
    validate(configurationPayload);

    const configuration = await createConfiguration({
        configurationPayload,
        createConfigurationInStore,
        sendMessage,
    });
    res.send(configuration);
};

export const postConfigurationHandler = (router: Router) => {
    router.post("/api/configuration", handler);
};
