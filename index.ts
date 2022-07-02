import RealDebdridMethods, {
    RealDebridDeviceCodeResponse,
    RealDebridDeviceCredentialsRequest,
    RealDebridDeviceCredentialsResponse,
    RealDebridTokenResponse,
} from "./methods";
import { RealDebridOptions } from "./base";

class RealDebrid extends RealDebdridMethods {
    constructor(options: RealDebridOptions) {
        super(options);
    }

    deviceCredentials = async (
        params: RealDebridDeviceCredentialsRequest
    ): Promise<RealDebridDeviceCredentialsResponse> => {
        const response = await super.deviceCredentials(params);

        this.client_id = response.client_id;
        this.client_secret = response.client_secret;

        return response;
    };

    pollToken = (params: RealDebridDeviceCodeResponse) => {
        let attempts = 0;
        const interval = params.interval * 1000;

        const poll = async (
            resolve: (value: RealDebridPollTokenResponse | PromiseLike<RealDebridPollTokenResponse>) => void,
            reject: (reason?: any) => void
        ) => {
            const credentials = await this.deviceCredentials({
                code: params.device_code,
                client_id: this.client_id,
            });

            if (credentials && credentials.client_id) {
                const token = await this.token({
                    code: params.device_code,
                    grant_type: "http://oauth.net/grant_type/device/1.0",
                });

                if (token) {
                    return resolve({
                        ...token,
                        client_id: this.client_id,
                        client_secret: this.client_secret,
                    });
                } else {
                    reject("An error occurred when retrieving the access token");
                }
            } else if (params.expires_in / params.interval <= attempts) {
                return reject("Code has expired, please start the process again to generate a new device code.");
            } else {
                attempts++;
                setTimeout(poll, interval, resolve, reject);
            }
        };

        return new Promise(poll);
    };

    ensureToken = async (params: RealDebridPollTokenResponse): Promise<RealDebridPollTokenResponse> => {
        const expiry = new Date((params.created_at + params.expires_in) * 1000);

        this.client_id = params.client_id;
        this.client_secret = params.client_secret;

        if (expiry < new Date()) {
            const token = await this.token({
                code: params.refresh_token,
                grant_type: "http://oauth.net/grant_type/device/1.0",
            });

            this.access_token = token.access_token;
            return { ...token, client_id: this.client_id, client_secret: this.client_secret };
        } else {
            this.access_token = params.access_token;
            return params;
        }
    };
}

export interface RealDebridPollTokenResponse extends RealDebridTokenResponse {
    client_id: string;
    client_secret: string;
}

export default RealDebrid;

export * from "./methods";
export * from "./base";
