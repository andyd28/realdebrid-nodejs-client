"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const fs_1 = __importDefault(require("fs"));
const __1 = __importDefault(require(".."));
const rd = new __1.default({
    client_id: "X245A4XAIBGVM",
});
let deviceCodeResponse = {};
let accessToken = {};
describe("Device Code Authentication", function () {
    if (fs_1.default.existsSync("./test/rd.json")) {
        accessToken = JSON.parse(fs_1.default.readFileSync("./test/rd.json", "utf8"));
    }
    if (accessToken?.access_token) {
        it("should return a refreshed token or the current one if still fresh", async function () {
            rd.ensureToken(accessToken);
        });
    }
    else {
        it("should return a device code for later use", async function () {
            deviceCodeResponse = await rd.deviceCode({ client_id: rd.client_id, new_credentials: "yes" });
            console.log(deviceCodeResponse);
            assert_1.default.ok(deviceCodeResponse);
        });
        it("should poll the trakt server while the device code is entered into the site", async function () {
            this.timeout(30000);
            accessToken = (await rd.pollToken(deviceCodeResponse));
            fs_1.default.writeFileSync("./test/rd.json", JSON.stringify(accessToken));
            assert_1.default.ok(accessToken.access_token);
        });
    }
    it("should show the traffic of the system", async function () {
        const torrents = (await rd.hostsRegexFolder());
        console.log(torrents);
        (0, assert_1.default)(torrents);
    });
});
