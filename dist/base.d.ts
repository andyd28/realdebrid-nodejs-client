declare class RealDebridBase {
    client_id: string;
    protected client_secret: string;
    protected access_token: string;
    protected redirect_uri: string;
    protected baseUrl: string;
    constructor(options: RealDebridOptions);
    protected parseEndpoint(endpoint: string, verb: string, params: Record<string, any>): string;
}
export default RealDebridBase;
export interface RealDebridOptions {
    access_token?: string;
    client_id: string;
    client_secret?: string;
    redirect_uri?: string;
}
