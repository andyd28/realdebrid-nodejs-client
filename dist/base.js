"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RealDebridBase {
    constructor(options) {
        this.baseUrl = "https://api.real-debrid.com/rest/1.0";
        this.client_id = options.client_id;
        this.client_secret = options.client_secret ?? "";
        this.access_token = options.access_token ?? "";
        this.redirect_uri = options.redirect_uri ?? "urn:ietf:wg:oauth:2.0:oob";
    }
    parseEndpoint(endpoint, verb, params) {
        const querystring = new Map();
        for (const param in params) {
            const match = endpoint.match("{" + param + "}");
            if (match?.length ?? 0 > 0) {
                endpoint = endpoint.replace("{" + param + "}", params[param]);
            }
            else {
                querystring.set(param, params[param]);
            }
        }
        if (querystring.size > 0 && verb === "GET") {
            endpoint += "?";
            querystring.forEach((value, key) => (endpoint += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&"));
            endpoint = endpoint.substring(0, endpoint.length - 1);
        }
        endpoint = endpoint.replace(/\/+/g, "/");
        return endpoint;
    }
}
exports.default = RealDebridBase;
//# sourceMappingURL=base.js.map