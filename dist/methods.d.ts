import RealDebridBase, { RealDebridOptions } from "./base";
declare class RealDebridMethods extends RealDebridBase {
    constructor(options: RealDebridOptions);
    disable_access_token: () => Promise<any>;
    time: () => Promise<string>;
    timeIso: () => Promise<string>;
    user: () => Promise<RealDebridUserResponse>;
    unrestrictCheck: (params: RealDebridUnrestrictCheckRequest) => Promise<RealDebridUnrestrictCheckResponse>;
    unrestrictLink: (params: RealDebridUnrestrictLinkRequest) => Promise<RealDebridUnrestrictLinkResponse>;
    unrestrictFolder: (params: RealDebridUnrestrictFolderRequest) => Promise<string[]>;
    unrestrictContainerFile: () => Promise<string[]>;
    unrestrictContainerLink: (params: RealDebridUnrestrictContainerLinkRequest) => Promise<string[]>;
    traffic: () => Promise<RealDebridTrafficResponse>;
    trafficDetails: (params: RealDebridTrafficDetailsRequest) => Promise<any>;
    streamingTranscode: (params: RealDebridStreamingTranscodeRequest) => Promise<RealDebridStreamingTranscodeResponse>;
    streamingMediaInfos: (params: RealDebridStreamingMediaInfosRequest) => Promise<any>;
    downloads: (params: RealDebridDownloadsRequest) => Promise<RealDebridDownloadsResponse[]>;
    downloadsDelete: (params: RealDebridDownloadsDeleteRequest) => Promise<any>;
    torrents: (params: RealDebridTorrentsRequest) => Promise<RealDebridTorrentsResponse[]>;
    torrentsInfo: (params: RealDebridTorrentsInfoRequest) => Promise<RealDebridTorrentsInfoResponse[]>;
    torrentsInstantAvailability: (params: RealDebridTorrentsInstantAvailabilityRequest) => Promise<RealDebridTorrentsInstantAvailabilityResponse>;
    torrentsActiveCount: () => Promise<RealDebridTorrentsActiveCountResponse>;
    torrentsAvailableHosts: () => Promise<RealDebridTorrentsAvailableHostsResponse[]>;
    torrentsAddTorrent: (params: RealDebridTorrentsAddTorrentRequest) => Promise<RealDebridTorrentsAddTorrentResponse>;
    torrentsAddMagnet: (params: RealDebridTorrentsAddMagnetRequest) => Promise<RealDebridTorrentsAddMagnetResponse>;
    torrentsSelectFiles: (params: RealDebridTorrentsSelectFilesRequest) => Promise<any>;
    torrentsDelete: (params: RealDebridTorrentsDeleteRequest) => Promise<any>;
    hosts: () => Promise<RealDebridHostsResponse>;
    hostsStatus: () => Promise<RealDebridHostsStatusResponse>;
    hostsRegex: () => Promise<string[]>;
    hostsRegexFolder: () => Promise<string[]>;
    hostsDomains: () => Promise<string[]>;
    settings: () => Promise<RealDebridSettingsResponse>;
    settingsUpdate: (params: RealDebridSettingsUpdateRequest) => Promise<any>;
    settingsConvertPoints: () => Promise<any>;
    settingsChangePassword: () => Promise<any>;
    settingsAvatarFile: () => Promise<any>;
    settingsAvatarDelete: () => Promise<any>;
    deviceCode: (params: RealDebridDeviceCodeRequest) => Promise<RealDebridDeviceCodeResponse>;
    deviceCredentials: (params: RealDebridDeviceCredentialsRequest) => Promise<RealDebridDeviceCredentialsResponse>;
    token: (params: RealDebridTokenRequest) => Promise<RealDebridTokenResponse>;
}
export default RealDebridMethods;
export interface RealDebridUserResponse {
    id: number;
    username: string;
    email: string;
    points: number;
    locale: string;
    avatar: string;
    type: string;
    premium: number;
    expiration: string;
}
export interface RealDebridUnrestrictCheckRequest {
    link: string;
    password?: string;
}
export interface RealDebridUnrestrictCheckResponse {
    host: string;
    link: string;
    filename: string;
    filesize: number;
    supported: number;
}
export interface RealDebridUnrestrictLinkRequest {
    link: string;
    password?: string;
    remote?: number;
}
export interface RealDebridUnrestrictLinkResponse {
    id: string;
    filename: string;
    mimeType: string;
    filesize: number;
    link: string;
    host: string;
    chunks: number;
    crc: number;
    download: string;
    streamable: number;
}
export interface RealDebridUnrestrictFolderRequest {
    link: string;
}
export interface RealDebridUnrestrictContainerLinkRequest {
    link: string;
}
export interface RealDebridTrafficResponse {
    [key: string]: {
        left: number;
        bytes: number;
        links: number;
        limit: number;
        type: string;
        extra: number;
        reset: string;
    };
}
export interface RealDebridTrafficDetailsRequest {
    start?: Date;
    end?: Date;
}
export interface RealDebridStreamingTranscodeRequest {
    id: string;
}
export interface RealDebridStreamingTranscodeResponse {
    apple: {
        quality: string;
    };
    dash: {
        quality: string;
    };
    liveMP4: {
        quality: string;
    };
    h264WebM: {
        quality: string;
    };
}
export interface RealDebridStreamingMediaInfosRequest {
    id: string;
}
export interface RealDebridDownloadsRequest {
    offset?: number;
    page?: number;
    limit?: number;
}
export interface RealDebridDownloadsResponse {
    id: string;
    filename: string;
    mimeType: string;
    filesize: number;
    link: string;
    host: string;
    chunks: number;
    download: string;
    generated: string;
    type?: string;
}
export interface RealDebridDownloadsDeleteRequest {
    id: string;
}
export interface RealDebridTorrentsRequest {
    offset?: number;
    page?: number;
    limit?: number;
    filter?: string;
}
export interface RealDebridTorrentsResponse {
    id: string;
    filename: string;
    hash: string;
    bytes: number;
    host: string;
    split: number;
    progress: number;
    status: string;
    added: string;
    links: string[];
    ended: string;
    speed?: number;
    seeders?: number;
}
export interface RealDebridTorrentsInfoRequest {
    id: string;
}
export interface RealDebridTorrentsInfoResponse {
    id: string;
    filename: string;
    original_filename: string;
    hash: string;
    bytes: number;
    original_bytes: number;
    host: string;
    split: number;
    progress: number;
    status: string;
    added: string;
    files: {
        id: number;
        path: string;
        bytes: number;
        selected: number;
    }[];
    links: string[];
    ended: string;
    speed: number;
    seeders: number;
}
export interface RealDebridTorrentsInstantAvailabilityRequest {
    hash: string;
}
export interface RealDebridTorrentsInstantAvailabilityResponse {
    [key: string]: {
        [key: string]: {
            number: {
                filename: string;
                filesize: number;
            };
        }[];
    };
}
export interface RealDebridTorrentsActiveCountResponse {
    nb: number;
    limit: number;
}
export interface RealDebridTorrentsAvailableHostsResponse {
    host: string;
    max_file_size: number;
}
export interface RealDebridTorrentsAddTorrentRequest {
    host?: string;
}
export interface RealDebridTorrentsAddTorrentResponse {
    id: string;
    uri: string;
}
export interface RealDebridTorrentsAddMagnetRequest {
    magnet: string;
    host?: string;
}
export interface RealDebridTorrentsAddMagnetResponse {
    id: string;
    uri: string;
}
export interface RealDebridTorrentsSelectFilesRequest {
    id: string;
    files: string;
}
export interface RealDebridTorrentsDeleteRequest {
    id: string;
}
export interface RealDebridHostsResponse {
    [key: string]: {
        id: string;
        name: string;
        image: string;
    };
}
export interface RealDebridHostsStatusResponse {
    [key: string]: {
        id: string;
        name: string;
        image: string;
        supported: number;
        status: string;
        check_time: string;
        competitors_status: {
            [key: string]: {
                status: string;
                check_time: string;
            };
        };
    };
}
export interface RealDebridSettingsResponse {
    download_ports: string[];
    download_port: string;
    locales: {
        [key: string]: string;
    };
    locale: string;
    streaming_qualities: string[];
    streaming_quality: string;
    mobile_streaming_quality: string;
    streaming_languages: {
        [key: string]: string;
    };
    streaming_language_preference: string;
    streaming_cast_audio: string[];
    streaming_cast_audio_preference: string;
}
export interface RealDebridSettingsUpdateRequest {
    setting_name: string;
    setting_value: string;
}
export interface RealDebridDeviceCodeRequest {
    client_id: string;
    new_credentials: "yes";
}
export interface RealDebridDeviceCodeResponse {
    device_code: string;
    user_code: string;
    interval: number;
    expires_in: number;
    verification_url: string;
    direct_verification_url: string;
}
export interface RealDebridDeviceCredentialsRequest {
    client_id: string;
    code: string;
}
export interface RealDebridDeviceCredentialsResponse {
    client_id: string;
    client_secret: string;
}
export interface RealDebridTokenRequest {
    code: string;
    redirect_uri?: string;
    grant_type: "authorization_code" | "http://oauth.net/grant_type/device/1.0";
}
export interface RealDebridTokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    refresh_token: string;
    created_at: number;
}
