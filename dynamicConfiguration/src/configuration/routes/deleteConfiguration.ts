import { Router, Request, Response } from "express";
import { deleteConfiguration as deleteConfigurationInStore } from "../store/deleteConfiguration";
import { deleteConfiguration } from "../domain/deleteConfiguration";
import { validateId } from "./validation/idValidator";
import { sendMessage } from "../configurationChange/sendMessage";

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
