import { Router, Request, Response } from "express";
import { getConfigurationById as getConfigurationByIdFromStore } from "../store/getConfigurationById";
import { getConfigurationById } from "../domain/getConfigurationById";
import { validateId } from "./validation/idValidator";

const handler = async (req: Request, res: Response) => {
    const id = req.params.id as string | undefined;
    validateId(id);

    const configuration = await getConfigurationById({ id, getConfigurationByIdFromStore });
    res.send(configuration);
};

export const getConfigurationByIdHandler = (router: Router) => {
    router.get("/api/configuration/:id", handler);
};
