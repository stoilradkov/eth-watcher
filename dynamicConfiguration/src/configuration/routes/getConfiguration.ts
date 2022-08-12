import { Router, Request, Response } from "express";
import { BadRequestError } from "../../errors/badRequestError";
import { getConfigurationById } from "../db/getConfigurationById";
import { getConfiguraton } from "../domain/getConfiguration";

const handler = async (req: Request, res: Response) => {
    const id = req.params.id as string | undefined;
    validate(id);

    const configuration = await getConfiguraton(id, getConfigurationById);
    res.send(configuration);
};

function validate(id: string | undefined): asserts id is string {
    if (id === undefined || typeof id !== "string") {
        throw new BadRequestError("Please specify an id");
    }
}

export const getConfigurationHandler = (router: Router) => {
    router.get("/api/configuration/:id", handler);
};
