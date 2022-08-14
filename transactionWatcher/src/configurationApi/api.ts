import axios, { AxiosError, AxiosInstance } from "axios";
import { logWarn } from "../logger";

export interface ApiConfiguration {
    uri: string;
}

export type ReturnType<T> =
    | {
          data: T;
          error: null;
      }
    | { data: null; error: Error };

export class Api {
    #axios: AxiosInstance;

    constructor({ uri }: ApiConfiguration) {
        this.#axios = axios.create({
            baseURL: uri,
        });
    }

    public get = async <ResponseType>(url: string, params?: unknown): Promise<ReturnType<ResponseType>> => {
        try {
            const response = await this.#axios.get(url, { params });
            return { data: response.data, error: null };
        } catch (error) {
            const messages = ["Config api error", url, params];

            const e = error as AxiosError;
            if (e.response) {
                const { data, status, headers } = e.response;
                logWarn(...messages, data, status, headers);
            } else if (e.request) {
                logWarn(...messages, e.request);
            } else {
                logWarn(...messages, e.message);
            }
            logWarn(e.config);
            return { data: null, error: e };
        }
    };
}
