import { Router, Request, Response } from "express";
import { deleteConfiguration as deleteConfigurationInStore } from "../store/deleteConfiguration";
import { deleteConfiguration } from "../domain/deleteConfiguration";
import { validateId } from "./validation/idValidator";
import { sendMessage } from "../configurationChange/sendMessage";

/**
 * Validates the request arguments, forwards the request to the domain logic
 * and sends back a response of the id of the deleted configuration
 * @param req - express request object
 * @param res - express response object
 * @throws BadRequestError if the arguments are not valid
 */
const handler = async (req: Request, res: Response) => {
    const id = req.params.id as string | undefined;
    validateId(id);

    const deletedId = await deleteConfiguration({
        id,
        deleteConfigurationInStore,
        sendMessage,
    });
    res.send({ id: deletedId });
};

export const deleteConfigurationHandler = (router: Router) => {
    router.delete("/api/configuration/:id", handler);
};
