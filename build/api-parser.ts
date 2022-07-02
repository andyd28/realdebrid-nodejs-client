import fs from "fs";
import { parse, HTMLElement } from "node-html-parser";
import { stringify } from "querystring";
import { Method, MethodGroup, MethodParameter } from "./api-types";

async function main() {
    const contents = fs.readFileSync("api.html", { encoding: "utf8" });
    const root = parse(contents);

    let methods: MethodGroup = {} as MethodGroup;

    root.querySelectorAll(".leswag_resource").forEach((value) => {
        const method: Method = {} as Method;

        /**** VERB ****/
        const verbEndpoint = (value.querySelector("h4")?.text ?? "").split(" ");
        method.verb = (verbEndpoint[0] as "GET" | "POST" | "PUT" | "DELETE") ?? "GET";
        if (verbEndpoint.length > 0) method.endpoint = verbEndpoint[1];

        /**** BODY ****/
        const response = value.querySelector(".leswag_return_value");
        const body = sanitiseResponseBody(root, response);

        method.response = { body: {} };
        if (body !== "None") {
            method.response.body = body;
        }

        /**** PARAMETERS ****/
        const paramMatches = [...method.endpoint.matchAll(/\{([^\}]+)\}/g)];
        if (method && paramMatches.length > 0) {
            const parameters = {} as Record<string, MethodParameter>;
            paramMatches.forEach((m) => {
                parameters[m[1]] = {
                    required: true,
                    values: [],
                    type: "string",
                };
            });

            method.parameters = parameters;
        }

        /**** REQUEST HEADERS ****/
        method.request = {
            headers: {
                Authorization: "Bearer [access_token]",
            },
        };

        /**** REQUEST BODY ****/
        const bodyRows = value.querySelectorAll(".leswag_parameters tr");
        if (bodyRows.length > 0) {
            const bodyParams = {} as Record<string, MethodParameter>;
            bodyRows.forEach((row) => {
                const rowCells = row.querySelectorAll("td");
                bodyParams[rowCells[1].textContent.split(" ")[0]] = {
                    required: rowCells[1].classNames.indexOf("required") > -1,
                    values: [],
                    type: sanitiseType(rowCells[2].textContent),
                };
            });

            if (method.verb === "GET") {
                method.parameters = { ...method.parameters, ...bodyParams };
            } else {
                method.request.body = bodyParams;
            }
        }

        /**** METHOD NAME ****/
        let methodSegments = method.endpoint.split("/");
        methodSegments = methodSegments.filter((f) => f.length > 0 && f.indexOf("{") === -1);
        methodSegments = methodSegments.map((f, ix) => (ix === 0 ? f : f[0].toUpperCase() + f.substring(1)));
        const methodName = methodSegments.join("");
        methods[methodName] = method;
    });

    /*** ADD Auth Method Manually ***/
    // see full workflow to get the code
    methods["deviceCode"] = {
        verb: "GET",
        baseUrl: "https://api.real-debrid.com",
        endpoint: "/oauth/v2/device/code",
        parameters: {
            client_id: { required: true, values: [], type: "string" },
            new_credentials: { required: true, values: ["yes"], type: "string" },
        },
        request: { body: {} },
        oauth: false,
        pagination: false,
        extended: false,
        filters: false,
        emojis: false,
        response: {
            body: {
                device_code: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                user_code: "ABCDEF0123456",
                interval: 5,
                expires_in: 1800,
                verification_url: "https://real-debrid.com/device",
                direct_verification_url: "",
            },
        },
    };

    methods["deviceCredentials"] = {
        verb: "GET",
        baseUrl: "https://api.real-debrid.com",
        endpoint: "/oauth/v2/device/credentials",
        parameters: {
            client_id: { required: true, values: [], type: "string" },
            code: { required: true, values: [], type: "string" },
        },
        request: { body: {} },
        oauth: false,
        pagination: false,
        extended: false,
        filters: false,
        emojis: false,
        response: {
            body: {
                client_id: "",
                client_secret: "",
            },
        },
    };

    methods["token"] = {
        verb: "POST",
        baseUrl: "https://api.real-debrid.com",
        endpoint: "/oauth/v2/token",
        request: {
            body: {
                client_id: { required: true, values: [], type: "string" },
                client_secret: { required: true, values: [], type: "string" },
                code: { required: true, values: [], type: "string" },
                redirect_uri: { required: false, values: [], type: "string" },
                grant_type: {
                    required: true,
                    values: ["authorization_code", "http://oauth.net/grant_type/device/1.0"],
                    type: "string",
                },
            },
        },
        oauth: false,
        pagination: false,
        extended: false,
        filters: false,
        emojis: false,
        response: {
            body: {
                access_token: "token",
                expires_in: 0,
                token_type: "Bearer",
                refresh_token: "token",
                created_at: 0,
            },
        },
    };

    fs.writeFileSync("data.json", JSON.stringify(methods, null, 2));
}

function sanitiseType(input: string) {
    switch (input) {
        case "int":
            return "number";
        case "date (YYYY-MM-DD)":
            return "Date";
        default:
            return "string";
    }
}

function sanitiseResponseBody(root: HTMLElement, element: HTMLElement | null): any {
    if (!element) return "";

    if (!element.querySelector(".leswag_model")) return (element?.textContent ?? "").trim();

    const model = element.querySelector(".leswag_model");
    const modelId = model?.getAttribute("data-model-id");

    if (!root.querySelector("#leswag_model_" + modelId)) return "";

    const bodyRoot = parse(root.querySelector("#leswag_model_" + modelId + " pre")?.textContent ?? "");

    let modelString = bodyRoot.querySelector("span")?.textContent ?? "";

    modelString = modelString
        .replace(/\/\/.+[^\n]/gi, "")
        .replace(/\s+/g, " ")
        .replace(/\}\s+\{/, "}, {")
        .replace(/\},\s+\]/, "} ]")
        .split(/:\sint/)
        .join(": 0");

    try {
        return JSON.parse(modelString);
    } catch {
        // Will have to populate these manually for now
        // Perhaps do a post build hack area
        console.log(modelId);
        console.log(modelString);

        return {};
    }
}

main();
