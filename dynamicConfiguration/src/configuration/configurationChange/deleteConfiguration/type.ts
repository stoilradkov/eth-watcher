export interface Payload {
    id: string;
}
export type SendDeleteConfigurationFunction = (channel: string, payload: Payload) => Promise<void>;
