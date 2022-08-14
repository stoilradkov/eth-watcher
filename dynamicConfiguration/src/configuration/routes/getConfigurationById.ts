import { Router, Request, Response } from "express";
import { getConfigurationById as getConfigurationByIdFromStore } from "../store/getConfigurationById";
import { getConfigurationById } from "../domain/getConfigurationById";
import { validateId } from "./validation/idValidator";

/**
 * Validates the request arguments, forwards the request to the domain logic
 * and sends back a response of the configuration found
 * @param req - express request object
 * @param res - express response object
 * @throws BadRequestError if the arguments are not valid
 */
const handler = async (req: Request, res: Response) => {
    const id = req.params.id as string | undefined;
    validateId(id);

    const configuration = await getConfigurationById({ id, getConfigurationByIdFromStore });
    res.send(configuration);
};

export const getConfigurationByIdHandler = (router: Router) => {
    router.get("/api/configuration/:id", handler);
};
