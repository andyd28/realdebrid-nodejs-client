import { stringify } from "querystring";

class RealDebridBase {
    public client_id: string;
    protected client_secret: string;
    protected access_token: string;
    protected redirect_uri: string;
    protected baseUrl = "https://api.real-debrid.com/rest/1.0";

    constructor(options: RealDebridOptions) {
        this.client_id = options.client_id;
        this.client_secret = options.client_secret ?? "";
        this.access_token = options.access_token ?? "";
        this.redirect_uri = options.redirect_uri ?? "urn:ietf:wg:oauth:2.0:oob";
    }

    protected parseEndpoint(endpoint: string, verb: string, params: Record<string, any>): string {
        const querystring: Map<string, string> = new Map<string, string>();

        for (const param in params) {
            const match = endpoint.match("{" + param + "}");

            if (match?.length ?? 0 > 0) {
                endpoint = endpoint.replace("{" + param + "}", params[param]);
            } else {
                querystring.set(param, params[param]);
            }
        }

        if (querystring.size > 0 && verb === "GET") {
            endpoint += "?";

            querystring.forEach(
                (value, key) => (endpoint += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&")
            );

            endpoint = endpoint.substring(0, endpoint.length - 1);
        }

        endpoint = endpoint.replace(/\/+/g, "/");

        return endpoint;
    }
}

export default RealDebridBase;

export interface RealDebridOptions {
    access_token?: string;
    client_id: string;
    client_secret?: string;
    redirect_uri?: string;
}
