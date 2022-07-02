"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const methods_1 = __importDefault(require("./methods"));
class RealDebrid extends methods_1.default {
    constructor(options) {
        super(options);
        this.deviceCredentials = async (params) => {
            const response = await super.deviceCredentials(params);
            this.client_id = response.client_id;
            this.client_secret = response.client_secret;
            return response;
        };
        this.pollToken = (params) => {
            let attempts = 0;
            const interval = params.interval * 1000;
            const poll = async (resolve, reject) => {
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
                    }
                    else {
                        reject("An error occurred when retrieving the access token");
                    }
                }
                else if (params.expires_in / params.interval <= attempts) {
                    return reject("Code has expired, please start the process again to generate a new device code.");
                }
                else {
                    attempts++;
                    setTimeout(poll, interval, resolve, reject);
                }
            };
            return new Promise(poll);
        };
        this.ensureToken = async (params) => {
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
            }
            else {
                this.access_token = params.access_token;
                return params;
            }
        };
    }
}
exports.default = RealDebrid;
__exportStar(require("./methods"), exports);
__exportStar(require("./base"), exports);
//# sourceMappingURL=index.js.map