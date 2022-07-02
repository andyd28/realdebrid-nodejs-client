"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("./base"));
const got_1 = __importDefault(require("got"));
class RealDebridMethods extends base_1.default {
    constructor(options) {
        super(options);
        this.disable_access_token = async () => {
            const route = this.baseUrl + "/disable_access_token";
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.time = async () => {
            const route = this.baseUrl + "/time";
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.timeIso = async () => {
            const route = this.baseUrl + "/time/iso";
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.user = async () => {
            const route = this.baseUrl + "/user";
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.unrestrictCheck = async (params) => {
            const route = this.baseUrl + this.parseEndpoint("/unrestrict/check", "POST", params);
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
                form: {
                    "link": params.link,
                    "password": params.password
                },
            })).body;
        };
        this.unrestrictLink = async (params) => {
            const route = this.baseUrl + this.parseEndpoint("/unrestrict/link", "POST", params);
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
                form: {
                    "link": params.link,
                    "password": params.password,
                    "remote": params.remote
                },
            })).body;
        };
        this.unrestrictFolder = async (params) => {
            const route = this.baseUrl + this.parseEndpoint("/unrestrict/folder", "POST", params);
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
                form: {
                    "link": params.link
                },
            })).body;
        };
        this.unrestrictContainerFile = async () => {
            const route = this.baseUrl + "/unrestrict/containerFile";
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.unrestrictContainerLink = async (params) => {
            const route = this.baseUrl + this.parseEndpoint("/unrestrict/containerLink", "POST", params);
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
                form: {
                    "link": params.link
                },
            })).body;
        };
        this.traffic = async () => {
            const route = this.baseUrl + "/traffic";
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.trafficDetails = async (params) => {
            const route = this.baseUrl + this.parseEndpoint("/traffic/details", "GET", params);
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.streamingTranscode = async (params) => {
            const route = this.baseUrl + this.parseEndpoint("/streaming/transcode/{id}", "GET", params);
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.streamingMediaInfos = async (params) => {
            const route = this.baseUrl + this.parseEndpoint("/streaming/mediaInfos/{id}", "GET", params);
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.downloads = async (params) => {
            const route = this.baseUrl + this.parseEndpoint("/downloads", "GET", params);
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.downloadsDelete = async (params) => {
            const route = this.baseUrl + this.parseEndpoint("/downloads/delete/{id}", "DELETE", params);
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.torrents = async (params) => {
            const route = this.baseUrl + this.parseEndpoint("/torrents", "GET", params);
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.torrentsInfo = async (params) => {
            const route = this.baseUrl + this.parseEndpoint("/torrents/info/{id}", "GET", params);
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.torrentsInstantAvailability = async (params) => {
            const route = this.baseUrl + this.parseEndpoint("/torrents/instantAvailability/{hash}", "GET", params);
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.torrentsActiveCount = async () => {
            const route = this.baseUrl + "/torrents/activeCount";
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.torrentsAvailableHosts = async () => {
            const route = this.baseUrl + "/torrents/availableHosts";
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.torrentsAddTorrent = async (params) => {
            const route = this.baseUrl + this.parseEndpoint("/torrents/addTorrent", "PUT", params);
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
                form: {
                    "host": params.host
                },
            })).body;
        };
        this.torrentsAddMagnet = async (params) => {
            const route = this.baseUrl + this.parseEndpoint("/torrents/addMagnet", "POST", params);
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
                form: {
                    "magnet": params.magnet,
                    "host": params.host
                },
            })).body;
        };
        this.torrentsSelectFiles = async (params) => {
            const route = this.baseUrl + this.parseEndpoint("/torrents/selectFiles/{id}", "POST", params);
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
                form: {
                    "files": params.files
                },
            })).body;
        };
        this.torrentsDelete = async (params) => {
            const route = this.baseUrl + this.parseEndpoint("/torrents/delete/{id}", "DELETE", params);
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.hosts = async () => {
            const route = this.baseUrl + "/hosts";
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.hostsStatus = async () => {
            const route = this.baseUrl + "/hosts/status";
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.hostsRegex = async () => {
            const route = this.baseUrl + "/hosts/regex";
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.hostsRegexFolder = async () => {
            const route = this.baseUrl + "/hosts/regexFolder";
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.hostsDomains = async () => {
            const route = this.baseUrl + "/hosts/domains";
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.settings = async () => {
            const route = this.baseUrl + "/settings";
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.settingsUpdate = async (params) => {
            const route = this.baseUrl + this.parseEndpoint("/settings/update", "POST", params);
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
                form: {
                    "setting_name": params.setting_name,
                    "setting_value": params.setting_value
                },
            })).body;
        };
        this.settingsConvertPoints = async () => {
            const route = this.baseUrl + "/settings/convertPoints";
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.settingsChangePassword = async () => {
            const route = this.baseUrl + "/settings/changePassword";
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.settingsAvatarFile = async () => {
            const route = this.baseUrl + "/settings/avatarFile";
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.settingsAvatarDelete = async () => {
            const route = this.baseUrl + "/settings/avatarDelete";
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
            })).body;
        };
        this.deviceCode = async (params) => {
            const route = "https://api.real-debrid.com" + this.parseEndpoint("/oauth/v2/device/code", "GET", params);
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "GET",
            })).body;
        };
        this.deviceCredentials = async (params) => {
            const route = "https://api.real-debrid.com" + this.parseEndpoint("/oauth/v2/device/credentials", "GET", params);
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "GET",
            })).body;
        };
        this.token = async (params) => {
            const route = "https://api.real-debrid.com" + this.parseEndpoint("/oauth/v2/token", "POST", params);
            return (await (0, got_1.default)(route, {
                throwHttpErrors: true,
                responseType: "json",
                method: "POST",
                form: {
                    "client_id": this.client_id,
                    "client_secret": this.client_secret,
                    "code": params.code,
                    "redirect_uri": params.redirect_uri,
                    "grant_type": params.grant_type
                },
            })).body;
        };
    }
}
exports.default = RealDebridMethods;
//# sourceMappingURL=methods.js.map