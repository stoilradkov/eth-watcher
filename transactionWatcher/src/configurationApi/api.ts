import axios, { AxiosInstance } from "axios";

export interface ApiConfiguration {
    uri: string;
}

export class Api {
    #axios: AxiosInstance;

    constructor({ uri }: ApiConfiguration) {
        this.#axios = axios.create({
            baseURL: uri,
        });
    }

    public get = async <ResponseType>(url: string, params?: unknown): Promise<ResponseType> => {
        const response = await this.#axios.get(url, { params });
        return response.data;
    };
}
