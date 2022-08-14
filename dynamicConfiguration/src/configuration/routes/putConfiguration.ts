import { Router, Request, Response } from "express";
import { updateConfiguration as updateConfigurationInDb } from "./../db/updateConfiguration";
import { validateId } from "./util/idValidator";
import { validate } from "./util/configurationValidator";
import { updateConfiguration } from "../domain/updateConfiguration";
import { sendUpdateConfiguration } from "../configurationChange/updateConfiguration/sendUpdateConfiguration";

const handler = async (req: Request, res: Response) => {
    const id = req.params.id;
    validateId(id);

    const configurationPayload = req.body;
    validate(configurationPayload);

    const configuration = await updateConfiguration({
        id,
        configurationPayload,
        updateConfigurationFunction: updateConfigurationInDb,
        sendUpdateConfiguration,
    });
    res.send(configuration);
};

export const putConfigurationHandler = (router: Router) => {
    router.put("/api/configuration/:id", handler);
};
