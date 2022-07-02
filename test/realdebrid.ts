import assert from "assert";
import fs from "fs";
import RealDebrid, { RealDebridPollTokenResponse } from "..";
import { RealDebridDeviceCodeResponse, RealDebridTorrentsResponse, RealDebridUserResponse } from "../methods";

const rd = new RealDebrid({
    client_id: "X245A4XAIBGVM",
});

let deviceCodeResponse = {} as RealDebridDeviceCodeResponse;
let accessToken = {} as RealDebridPollTokenResponse;

describe("Device Code Authentication", function () {
    if (fs.existsSync("./test/rd.json")) {
        accessToken = JSON.parse(fs.readFileSync("./test/rd.json", "utf8"));
    }

    if (accessToken?.access_token) {
        it("should return a refreshed token or the current one if still fresh", async function () {
            rd.ensureToken(accessToken);
        });
    } else {
        it("should return a device code for later use", async function () {
            deviceCodeResponse = await rd.deviceCode({ client_id: rd.client_id, new_credentials: "yes" });
            console.log(deviceCodeResponse);

            assert.ok(deviceCodeResponse);
        });

        it("should poll the trakt server while the device code is entered into the site", async function () {
            this.timeout(30000);
            accessToken = (await rd.pollToken(deviceCodeResponse)) as RealDebridPollTokenResponse;

            fs.writeFileSync("./test/rd.json", JSON.stringify(accessToken));

            assert.ok(accessToken.access_token);
        });
    }

    it("should show the traffic of the system", async function () {
        const torrents = (await rd.hostsRegexFolder()) as string[];
        console.log(torrents);
        assert(torrents);
    });
});
