import RealDebridBase, { RealDebridOptions } from "./base";
import got, { Response } from "got";

class RealDebridMethods extends RealDebridBase {    
    constructor(options: RealDebridOptions) {
        super(options);
    }

	disable_access_token = async (): Promise<any> => {
        const route = this.baseUrl + "/disable_access_token";
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as any;   
    };

	time = async (): Promise<string> => {
        const route = this.baseUrl + "/time";
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as string;   
    };

	timeIso = async (): Promise<string> => {
        const route = this.baseUrl + "/time/iso";
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as string;   
    };

	user = async (): Promise<RealDebridUserResponse> => {
        const route = this.baseUrl + "/user";
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as RealDebridUserResponse;   
    };

	unrestrictCheck = async (params: RealDebridUnrestrictCheckRequest): Promise<RealDebridUnrestrictCheckResponse> => {
        const route = this.baseUrl + this.parseEndpoint("/unrestrict/check", "POST", params);
        
        return (await got(route, {
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
        })).body as RealDebridUnrestrictCheckResponse;   
    };

	unrestrictLink = async (params: RealDebridUnrestrictLinkRequest): Promise<RealDebridUnrestrictLinkResponse> => {
        const route = this.baseUrl + this.parseEndpoint("/unrestrict/link", "POST", params);
        
        return (await got(route, {
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
        })).body as RealDebridUnrestrictLinkResponse;   
    };

	unrestrictFolder = async (params: RealDebridUnrestrictFolderRequest): Promise<string[]> => {
        const route = this.baseUrl + this.parseEndpoint("/unrestrict/folder", "POST", params);
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
                form: {
                    "link": params.link
                },                          
        })).body as string[];   
    };

	unrestrictContainerFile = async (): Promise<string[]> => {
        const route = this.baseUrl + "/unrestrict/containerFile";
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "PUT",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as string[];   
    };

	unrestrictContainerLink = async (params: RealDebridUnrestrictContainerLinkRequest): Promise<string[]> => {
        const route = this.baseUrl + this.parseEndpoint("/unrestrict/containerLink", "POST", params);
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
                form: {
                    "link": params.link
                },                          
        })).body as string[];   
    };

	traffic = async (): Promise<RealDebridTrafficResponse> => {
        const route = this.baseUrl + "/traffic";
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as RealDebridTrafficResponse;   
    };

	trafficDetails = async (params: RealDebridTrafficDetailsRequest): Promise<any> => {
        const route = this.baseUrl + this.parseEndpoint("/traffic/details", "GET", params);
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as any;   
    };

	streamingTranscode = async (params: RealDebridStreamingTranscodeRequest): Promise<RealDebridStreamingTranscodeResponse> => {
        const route = this.baseUrl + this.parseEndpoint("/streaming/transcode/{id}", "GET", params);
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as RealDebridStreamingTranscodeResponse;   
    };

	streamingMediaInfos = async (params: RealDebridStreamingMediaInfosRequest): Promise<any> => {
        const route = this.baseUrl + this.parseEndpoint("/streaming/mediaInfos/{id}", "GET", params);
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as any;   
    };

	downloads = async (params: RealDebridDownloadsRequest): Promise<RealDebridDownloadsResponse[]> => {
        const route = this.baseUrl + this.parseEndpoint("/downloads", "GET", params);
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as RealDebridDownloadsResponse[];   
    };

	downloadsDelete = async (params: RealDebridDownloadsDeleteRequest): Promise<any> => {
        const route = this.baseUrl + this.parseEndpoint("/downloads/delete/{id}", "DELETE", params);
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as any;   
    };

	torrents = async (params: RealDebridTorrentsRequest): Promise<RealDebridTorrentsResponse[]> => {
        const route = this.baseUrl + this.parseEndpoint("/torrents", "GET", params);
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as RealDebridTorrentsResponse[];   
    };

	torrentsInfo = async (params: RealDebridTorrentsInfoRequest): Promise<RealDebridTorrentsInfoResponse[]> => {
        const route = this.baseUrl + this.parseEndpoint("/torrents/info/{id}", "GET", params);
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as RealDebridTorrentsInfoResponse[];   
    };

	torrentsInstantAvailability = async (params: RealDebridTorrentsInstantAvailabilityRequest): Promise<RealDebridTorrentsInstantAvailabilityResponse> => {
        const route = this.baseUrl + this.parseEndpoint("/torrents/instantAvailability/{hash}", "GET", params);
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as RealDebridTorrentsInstantAvailabilityResponse;   
    };

	torrentsActiveCount = async (): Promise<RealDebridTorrentsActiveCountResponse> => {
        const route = this.baseUrl + "/torrents/activeCount";
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as RealDebridTorrentsActiveCountResponse;   
    };

	torrentsAvailableHosts = async (): Promise<RealDebridTorrentsAvailableHostsResponse[]> => {
        const route = this.baseUrl + "/torrents/availableHosts";
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as RealDebridTorrentsAvailableHostsResponse[];   
    };

	torrentsAddTorrent = async (params: RealDebridTorrentsAddTorrentRequest): Promise<RealDebridTorrentsAddTorrentResponse> => {
        const route = this.baseUrl + this.parseEndpoint("/torrents/addTorrent", "PUT", params);
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "PUT",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
                form: {
                    "host": params.host
                },                          
        })).body as RealDebridTorrentsAddTorrentResponse;   
    };

	torrentsAddMagnet = async (params: RealDebridTorrentsAddMagnetRequest): Promise<RealDebridTorrentsAddMagnetResponse> => {
        const route = this.baseUrl + this.parseEndpoint("/torrents/addMagnet", "POST", params);
        
        return (await got(route, {
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
        })).body as RealDebridTorrentsAddMagnetResponse;   
    };

	torrentsSelectFiles = async (params: RealDebridTorrentsSelectFilesRequest): Promise<any> => {
        const route = this.baseUrl + this.parseEndpoint("/torrents/selectFiles/{id}", "POST", params);
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },
                form: {
                    "files": params.files
                },                          
        })).body as any;   
    };

	torrentsDelete = async (params: RealDebridTorrentsDeleteRequest): Promise<any> => {
        const route = this.baseUrl + this.parseEndpoint("/torrents/delete/{id}", "DELETE", params);
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as any;   
    };

	hosts = async (): Promise<RealDebridHostsResponse> => {
        const route = this.baseUrl + "/hosts";
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as RealDebridHostsResponse;   
    };

	hostsStatus = async (): Promise<RealDebridHostsStatusResponse> => {
        const route = this.baseUrl + "/hosts/status";
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as RealDebridHostsStatusResponse;   
    };

	hostsRegex = async (): Promise<string[]> => {
        const route = this.baseUrl + "/hosts/regex";
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as string[];   
    };

	hostsRegexFolder = async (): Promise<string[]> => {
        const route = this.baseUrl + "/hosts/regexFolder";
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as string[];   
    };

	hostsDomains = async (): Promise<string[]> => {
        const route = this.baseUrl + "/hosts/domains";
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as string[];   
    };

	settings = async (): Promise<RealDebridSettingsResponse> => {
        const route = this.baseUrl + "/settings";
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as RealDebridSettingsResponse;   
    };

	settingsUpdate = async (params: RealDebridSettingsUpdateRequest): Promise<any> => {
        const route = this.baseUrl + this.parseEndpoint("/settings/update", "POST", params);
        
        return (await got(route, {
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
        })).body as any;   
    };

	settingsConvertPoints = async (): Promise<any> => {
        const route = this.baseUrl + "/settings/convertPoints";
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as any;   
    };

	settingsChangePassword = async (): Promise<any> => {
        const route = this.baseUrl + "/settings/changePassword";
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as any;   
    };

	settingsAvatarFile = async (): Promise<any> => {
        const route = this.baseUrl + "/settings/avatarFile";
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "PUT",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as any;   
    };

	settingsAvatarDelete = async (): Promise<any> => {
        const route = this.baseUrl + "/settings/avatarDelete";
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + this.access_token
                },                          
        })).body as any;   
    };

	deviceCode = async (params: RealDebridDeviceCodeRequest): Promise<RealDebridDeviceCodeResponse> => {
        const route = "https://api.real-debrid.com" + this.parseEndpoint("/oauth/v2/device/code", "GET", params);
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "GET",                          
        })).body as RealDebridDeviceCodeResponse;   
    };

	deviceCredentials = async (params: RealDebridDeviceCredentialsRequest): Promise<RealDebridDeviceCredentialsResponse> => {
        const route = "https://api.real-debrid.com" + this.parseEndpoint("/oauth/v2/device/credentials", "GET", params);
        
        return (await got(route, {
            throwHttpErrors: true,
            responseType: "json",
            method: "GET",                          
        })).body as RealDebridDeviceCredentialsResponse;   
    };

	token = async (params: RealDebridTokenRequest): Promise<RealDebridTokenResponse> => {
        const route = "https://api.real-debrid.com" + this.parseEndpoint("/oauth/v2/token", "POST", params);
        
        return (await got(route, {
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
        })).body as RealDebridTokenResponse;   
    };
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
	grant_type: "authorization_code"|"http://oauth.net/grant_type/device/1.0";
}
    
export interface RealDebridTokenResponse { 
	access_token: string;
	expires_in: number;
	token_type: string;
	refresh_token: string;
	created_at: number; 
}
