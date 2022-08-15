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

/**
 * Provides a get method to query a REST api
 */
export class Api {
    #axios: AxiosInstance;

    constructor({ uri }: ApiConfiguration) {
        this.#axios = axios.create({
            baseURL: uri,
        });
    }

    /**
     * Makes a get call to a specified endpoint and returns the received data
     * or an error, if an error has occurred.
     * @param url - endpoint url
     * @param params - optional object of params
     * @returns an object of data and error keys, where the error is null if
     * no error occurred or data is null if an error occurred
     */
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
