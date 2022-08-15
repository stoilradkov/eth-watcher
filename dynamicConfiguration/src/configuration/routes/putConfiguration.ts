import { Router, Request, Response } from "express";
import { updateConfiguration as updateConfigurationInStore } from "../store/updateConfiguration";
import { validateId } from "./validation/idValidator";
import { validate } from "./validation/configurationValidator";
import { updateConfiguration } from "../domain/updateConfiguration";
import { sendMessage } from "../configurationChange/sendMessage";

/**
 * Validates the request arguments, forwards the request to the domain logic
 * and sends back a response of the updated configuration
 * @param req - express request object
 * @param res - express response object
 * @throws BadRequestError if the arguments are not valid
 */
const handler = async (req: Request, res: Response) => {
    const id = req.params.id;
    validateId(id);

    const configurationPayload = req.body;
    validate(configurationPayload);

    const configuration = await updateConfiguration({
        id,
        configurationPayload,
        updateConfigurationInStore,
        sendMessage,
    });
    res.send(configuration);
};

export const putConfigurationHandler = (router: Router) => {
    router.put("/api/configuration/:id", handler);
};
