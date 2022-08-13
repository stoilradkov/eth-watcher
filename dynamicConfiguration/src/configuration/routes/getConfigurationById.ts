import { Router, Request, Response } from "express";
import { getConfigurationById } from "../db/getConfigurationById";
import { getConfiguratonById } from "../domain/getConfigurationById";
import { validateId } from "./util/idValidator";

const handler = async (req: Request, res: Response) => {
    const id = req.params.id as string | undefined;
    validateId(id);

    const configuration = await getConfiguratonById(id, getConfigurationById);
    res.send(configuration);
};

export const getConfigurationByIdHandler = (router: Router) => {
    router.get("/api/configuration/:id", handler);
};
