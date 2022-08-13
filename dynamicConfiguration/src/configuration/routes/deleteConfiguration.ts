import { Router, Request, Response } from "express";
import { deleteConfiguration as deleteConfigurationInDb } from "../db/deleteConfiguration";
import { deleteConfiguration } from "../domain/deleteConfiguration";
import { validateId } from "./util/idValidator";

const handler = async (req: Request, res: Response) => {
    const id = req.params.id as string | undefined;
    validateId(id);

    const deletedId = await deleteConfiguration(id, deleteConfigurationInDb);
    res.send({ id: deletedId });
};

export const deleteConfigurationHandler = (router: Router) => {
    router.delete("/api/configuration/:id", handler);
};
