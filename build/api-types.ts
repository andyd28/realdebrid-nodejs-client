export interface MethodGroup extends Record<string, Method> {}

export interface Method {
    baseUrl?: string;
    endpoint: string;
    pagination: boolean;
    extended: boolean;
    filters: boolean;
    oauth: boolean;
    emojis: boolean;
    parameters?: Record<string, MethodParameter>;
    verb: "GET" | "POST" | "PUT" | "DELETE";
    request: {
        headers?: Record<string, string>;
        body?: Record<string, MethodParameter>;
    };
    response: {
        headers?: Record<string, string>;
        body: any;
    };
}

export interface MethodParameter {
    values: Array<string>;
    required: boolean;
    default?: string;
    type: string;
}
