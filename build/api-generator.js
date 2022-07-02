"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
/**
 * Utility Classes
 */
const toTabs = (n) => "\t".repeat(n);
const toPascalCase = (...args) => args
    .map((s) => {
    if (!s[0])
        return "";
    return s[0].toUpperCase() + s.substring(1);
})
    .join("");
const createInterfaceName = (methodName, suffix) => toPascalCase("RealDebrid", methodName, suffix);
/**
 * Read data from apib parsing
 */
const output = fs_1.default.readFileSync("data.json", { encoding: "utf8", flag: "r" });
const data = JSON.parse(output);
const writer = fs_1.default.createWriteStream("../methods.ts");
let interfaces = "";
/**
 * Class Open
 */
writer.write(`import RealDebridBase, { RealDebridOptions } from "./base";
import got, { Response } from "got";

class RealDebridMethods extends RealDebridBase {    
    constructor(options: RealDebridOptions) {
        super(options);
    }
`);
/**
 * Class Methods
 */
const classRequiredOptions = ["client_id", "client_secret"];
const classOptionalOptions = ["access_token"];
const classAllValues = [...classRequiredOptions, ...classOptionalOptions];
/**
 * Crew departments have invalid characters for object properties - added manually
 */
const problemInterfaces = {};
/**
 * Just for ease of use in applications, the common object interfaces are separate
 */
const commonInterfaces = {};
/**
 * Shorthand methods when parsing the Method object
 */
const hasParameters = (method) => !!method.parameters || method.extended || method.pagination || method.filters;
const hasRequestHeaders = (method) => Object.keys(method.request.headers ?? {}).length > 0;
const hasRequestBody = (method) => Object.keys(method.request.body ?? {}).length > 0;
const hasUserRequestBody = (method) => Object.keys(method.request.body ?? {}).filter((f) => classAllValues.indexOf(f) < 0).length > 0;
const hasResponseBody = (method) => Object.keys(method.response.body ?? {}).length > 0;
/**
 * When merging response arrays, check for any props that do not appear in all items
 */
const getOptionalProperties = (objects) => {
    const len = objects.length;
    const allProps = objects.map((o) => Object.keys(o)).flat();
    const countProps = {};
    allProps.forEach((p) => (countProps.hasOwnProperty(p) ? countProps[p]++ : (countProps[p] = 1)));
    return Object.entries(countProps)
        .filter(([key, value]) => value < len)
        .map(([key, value]) => key);
};
/**
 * Convert the response JSON into a typescript interface by analysing the prop values
 */
const propsToString = (obj, depth) => {
    let interfaceProps = "";
    let optional = [];
    if (!obj)
        return "";
    // If array then merge the props - typing for arrays is done outside in responseInterface/declaration
    if (Array.isArray(obj) && typeof obj[0] === "object" && depth == 1) {
        optional = getOptionalProperties(obj);
        obj = Object.assign({}, ...obj);
    }
    else if (Array.isArray(obj) && depth == 1) {
        obj = obj[0];
    }
    let lastValue;
    for (let [prop, value] of Object.entries(obj)) {
        let isArray = false, opt = optional.indexOf(prop) >= 0 ? "?" : "", outType = "object";
        // If array then merge the props
        if (Array.isArray(value) && typeof value[0] === "object") {
            isArray = true;
            value = Object.assign({}, ...value);
        }
        else if (Array.isArray(value)) {
            isArray = true;
            value = value[0];
            // If the value at zero is undefined (empty array) then use previous value
            // as they will be the same
            if (typeof value == "undefined")
                value = lastValue;
        }
        // If the props are numeric, then wrap
        if (/^[0-9].*/.test(prop))
            prop = `"${prop}"`;
        // If prop is string or int, then change to key
        if (prop === "int")
            prop = "number";
        if (prop === "string" || prop === "int")
            prop = `[key: ${[prop]}]`;
        // Get the type for the interface
        outType = typeof value;
        if (outType === "object") {
            if (commonInterfaces.hasOwnProperty(prop)) {
                commonInterfaces[prop] = { ...commonInterfaces[prop], ...value };
                interfaceProps += `\n${toTabs(depth)}${prop}${opt}: ${toPascalCase("RealDebrid", prop)}`;
            }
            else if (problemInterfaces.hasOwnProperty(prop)) {
                interfaceProps += `\n${toTabs(depth)}${prop}${opt}: ${problemInterfaces[prop]}`;
            }
            else {
                interfaceProps += `\n${toTabs(depth)}${prop}${opt}: {`;
                interfaceProps += propsToString(value, depth + 1);
                interfaceProps += `\n${toTabs(depth)}}`;
            }
        }
        else {
            interfaceProps += `\n${toTabs(depth)}${prop}${opt}: ${typeof value}`;
        }
        // isArray and semi-colon, save the last value for empty siblings
        interfaceProps += isArray ? "[];" : ";";
        lastValue = value;
    }
    return interfaceProps;
};
/**
 * Converts the request JSON into an interface
 */
const addRequestInterface = (methodName, method) => {
    const params = { ...(method.parameters ?? {}), ...(method.request.body ?? {}) };
    // if (method.pagination) {
    //     params["page"] = { required: false, type: "number", values: [] };
    //     params["limit"] = { required: false, type: "number", values: [] };
    // }
    // if (method.extended) {
    //     params["extended"] = { required: false, type: "string", values: ["full", "metadata"] };
    // }
    // if (method.filters) {
    //     params["filters"] = { required: false, type: "{ [key in TraktFilter]?: string }", values: [] };
    // }
    const interfaceName = createInterfaceName(methodName, "Request");
    if (Object.keys(params).length == 0)
        return "";
    const paramString = Object.entries(params)
        .filter(([key, value]) => method.verb === "GET" || classAllValues.indexOf(key) < 0)
        .map(([key, value]) => {
        let t = value?.type ?? "any";
        switch (t) {
            case "integer":
            case "float":
            case "flloat":
                t = "number";
                break;
            case "array":
                t = "Array<any>";
                break;
        }
        if (value && value.values && value.values.length > 0) {
            t = t == "number" ? value.values.join("|") : '"' + value.values.join('"|"') + '"';
        }
        return "\n\t" + key + (value?.required ?? false ? ": " : "?: ") + t + ";";
    })
        .join("");
    interfaces += `    
export interface ${interfaceName} { ${paramString}
}
`;
};
/**
 * Converts the response JSON body into an interface
 */
const addResponseInterface = (methodName, method) => {
    const interfaceName = createInterfaceName(methodName, "Response");
    let body = method.response.body ?? {};
    const isArray = Array.isArray(body);
    let oType = isArray ? typeof body[0] : typeof body;
    if (oType === "object") {
        interfaces += `    
export interface ${interfaceName} { ${propsToString(body, 1)} ${method.extended ? "\n\t[key: string]: any;" : ""}
}
`;
    }
    return (oType === "object" ? interfaceName : oType) + (isArray ? "[]" : "");
};
/**
 * Creates the interface and returns the name for the parameter declaration on the method
 */
const getParameterDeclaration = (methodName, method) => {
    if (!hasParameters(method) && !hasUserRequestBody(method))
        return "";
    addRequestInterface(methodName, method);
    return "params: " + createInterfaceName(methodName, "Request");
};
/**
 * Creates the response interface and returns the response type of the method
 */
const getResponseDeclaration = (methodName, method) => {
    let declaration = "any";
    if (hasResponseBody(method)) {
        declaration = addResponseInterface(methodName, method);
    }
    return declaration;
};
/**
 * Checks if the route requires parsing and returns the appropiate method.
 */
const getMethodRoute = (method) => {
    if (hasParameters(method) || hasUserRequestBody(method))
        return `this.parseEndpoint("${method.endpoint}", "${method.verb}", params)`;
    return `"${method.endpoint}"`;
};
/**
 * Parses the request headers and replaces the variables with class properties of request parameters
 */
const getRequestHeaders = (method) => {
    if (!hasRequestHeaders(method))
        return "";
    const rx = /([\w\s]+)?\[([^\]]+)\]/;
    // HACK for users, add the authorization header
    const requestHeaders = method.request.headers;
    if (method.endpoint.startsWith("/users/") && requestHeaders)
        requestHeaders["Authorization"] = "Bearer [access_token]";
    let headers = Object.entries(requestHeaders ?? {})
        .map(([key, value]) => {
        if (!rx.test(value))
            return `"${key}": "${value}"`;
        value = value.replace(rx, (match, p1, p2) => {
            if (match && !!p1)
                return `"${p1}" + this.${p2}`;
            return `this.${p2}`;
        });
        return `"${key}": ${value}`;
    })
        .join(",\n" + toTabs(5));
    return `
                headers: {
                    ${headers}
                },`;
};
/**
 * If the POST requires a body, pull the information from the JSON object
 */
const getRequestBody = (method) => {
    if (!hasRequestBody(method))
        return "";
    let body = Object.keys(method.request.body ?? {})
        .map((key) => {
        if (classAllValues.indexOf(key) >= 0)
            return `"${key}": this.${key}`;
        else
            return `"${key}": params.${key}`;
    })
        .join(",\n" + toTabs(5));
    return `
                form: {
                    ${body}
                },`;
};
for (const [methodName, method] of Object.entries(data)) {
    writer.write("\n\t" + methodName + " = ");
    const paramsDeclaration = getParameterDeclaration(methodName, method);
    const responseDeclaration = getResponseDeclaration(methodName, method);
    const route = getMethodRoute(method);
    writer.write(`async (${paramsDeclaration}): Promise<${responseDeclaration}> => {
        const route = ${method.baseUrl ? '"' + method.baseUrl + '"' : "this.baseUrl"} + ${route};
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "${method.verb}",${getRequestHeaders(method)}${getRequestBody(method)}                          
        })).body as ${responseDeclaration};   
    }`);
    writer.write(";\n");
}
/**
 * Class Close
 */
writer.write(`}
export default RealDebridMethods;

`);
writer.write(interfaces);
