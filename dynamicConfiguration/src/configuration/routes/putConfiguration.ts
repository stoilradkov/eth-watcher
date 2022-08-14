import { Router, Request, Response } from "express";
import { updateConfiguration as updateConfigurationInStore } from "../store/updateConfiguration";
import { validateId } from "./validation/idValidator";
import { validate } from "./validation/configurationValidator";
import { updateConfiguration } from "../domain/updateConfiguration";
import { sendUpdateConfigurationMessage } from "../configurationChange/updateConfigurationMessage/sendUpdateConfiguration";

const handler = async (req: Request, res: Response) => {
    const id = req.params.id;
    validateId(id);

    const configurationPayload = req.body;
    validate(configurationPayload);

    const configuration = await updateConfiguration({
        id,
        configurationPayload,
        updateConfigurationInStore,
        sendUpdateConfigurationMessage,
    });
    res.send(configuration);
};

export const putConfigurationHandler = (router: Router) => {
    router.put("/api/configuration/:id", handler);
};
