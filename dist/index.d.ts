import RealDebdridMethods, { RealDebridDeviceCodeResponse, RealDebridDeviceCredentialsRequest, RealDebridDeviceCredentialsResponse, RealDebridTokenResponse } from "./methods";
import { RealDebridOptions } from "./base";
declare class RealDebrid extends RealDebdridMethods {
    constructor(options: RealDebridOptions);
    deviceCredentials: (params: RealDebridDeviceCredentialsRequest) => Promise<RealDebridDeviceCredentialsResponse>;
    pollToken: (params: RealDebridDeviceCodeResponse) => Promise<RealDebridPollTokenResponse>;
    ensureToken: (params: RealDebridPollTokenResponse) => Promise<RealDebridPollTokenResponse>;
}
export interface RealDebridPollTokenResponse extends RealDebridTokenResponse {
    client_id: string;
    client_secret: string;
}
export default RealDebrid;
export * from "./methods";
export * from "./base";
