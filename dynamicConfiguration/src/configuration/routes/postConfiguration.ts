import { Router, Request, Response } from "express";
import { validate as jsonValidate } from "jsonschema";
import { createConfiguration as createConfigurationInDb } from "./../db/createConfiguration";
import { createConfiguration } from "../domain/createConfiguration";
import { Configuration } from "../domain/Configuration.type";
import { BadRequestError } from "../../errors/badRequestError";
import configurationSchema from "../schema.json";

const handler = async (req: Request, res: Response) => {
    const configurationPayload = req.body;
    validate(configurationPayload);

    const configuration = await createConfiguration(configurationPayload, createConfigurationInDb);
    res.send(configuration);
};

function validate(configurationPayload: unknown): asserts configurationPayload is Configuration {
    if (configurationPayload === undefined || !jsonValidate(configurationPayload, configurationSchema).valid) {
        throw new BadRequestError("Please provide a valid configuration");
    }
}

export const postConfigurationHandler = (router: Router) => {
    router.post("/api/configuration", handler);
};
