import { Router, Request, Response } from "express";
import { sendDeleteConfigurationMessage } from "../configurationChange/deleteConfigurationMessage/sendDeleteConfigurationMessage";
import { deleteConfiguration as deleteConfigurationInStore } from "../store/deleteConfiguration";
import { deleteConfiguration } from "../domain/deleteConfiguration";
import { validateId } from "./validation/idValidator";

const handler = async (req: Request, res: Response) => {
    const id = req.params.id as string | undefined;
    validateId(id);

    const deletedId = await deleteConfiguration({
        id,
        deleteConfigurationInStore,
        sendDeleteConfigurationMessage,
    });
    res.send({ id: deletedId });
};

export const deleteConfigurationHandler = (router: Router) => {
    router.delete("/api/configuration/:id", handler);
};
