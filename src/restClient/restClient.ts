/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
} from 'axios';

import { RoomTypeToAPIType, SettingsName } from '../constants';
import { Message } from '../models';
import { Errors, StatusCode } from './constants';
import {
    RestClientError,
    addUserToRoomErrorHandler,
    createDirectErrorHandler,
    createRoomErrorHandler,
    getRoomInfoErrorHandler,
    readRoomErrorHandler,
    removeUserFromRoomErrorHandler,
    sendAttachmentErrorHandler,
    sendMessageErrorHandler,
    setUserRoleErrorHandler,
} from './errorHandlers';
import { getUserInfoErrorHandler } from './errorHandlers/getUserInfoErrorHandler';
import { saveRoomSettingsErrorHandler } from './errorHandlers/saveRoomSettingsErrorHandler';
import {
    AddUsersToRoomRequestParams,
    CreatePrivateChannelRequestParams,
    CreatePublicChannelRequestParams,
    CreateUserRequestParams,
    DirectRoomResponse,
    GetHistoryData,
    GetHistoryRequestParams,
    GetRoomInfoByRoomIdRequestParams,
    GetRoomInfoRequestParams,
    GetRoomInfoResponse,
    LoginRequestParams,
    ReadRoomResponse,
    RemoveUserFromChannelRequestParams,
    RemoveUserFromChannelResponse,
    RestResponse,
    SaveRoomSettingsData,
    SaveRoomSettingsRequestParams,
    SccCallStartData,
    SccCallStartRequestParams,
    SccCreateConferenceRequestParams,
    SccCreateConferenceResponse,
    SccGetConferenceInfo,
    SendAttachmentRequestParams,
    SendMessageByGroupNameRequestParams,
    SendMessageData,
    SendMessageRequestParams,
    SettingsData,
    UserPreferencesData,
    UserPreferencesRequestParams,
    UserResponse,
} from './types';
import {
    ChannelData,
    CreatePrivateChannelResponse,
    CreatePublicChannelResponse,
    User,
} from './types/models';
import {
    SetUserRoleRequestParams,
    SetUserRoleResponse,
} from './types/restAPI/changeRoles';
import { callMeteorRequest } from './utils/callMeteorRequest';
import { validateRestResponse } from './utils/validateRestResponse';
import {
    handleRestErrorByResponse,
    AxiosErrorWithData,
} from './utils/handleRestErrorByResponse';
import { CreateTeamRequestParams } from './types/restAPI/createTeam';
import { TeamType } from '../constants/team';
import { CreateTeamResponse } from './types/models/teamData';
import { LinkChannelsToTeamRequestParams } from './types/restAPI/linkChannelsToTeam';
import { LinkChannelsToTeamResponse } from './types/models/linkedChannelData';
import { CreateDiscussionRequestParams } from './types/restAPI/createDiscussion';
import { CreateDiscussionResponse } from './types/models/discussionData';
import { SccGetUsersConferences } from './types/restAPI/sccGetUsersConferences';
import { GetCommandsResponse } from './types/models/commandData';
import { GetRolesListResponse } from './types/models/rolesData';

export function createHttpClient(serverUrl: string, userAgent?: string) {
    const userAgentHeader = {
        'User-Agent': userAgent,
    };
    return axios.create({
        baseURL: `${serverUrl}/api/v1/`,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            ...(userAgent && userAgentHeader),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    });
}

export class RestClient {
    private httpClient: AxiosInstance;
    private isClientAuthorized = false;
    private userAgent: string | undefined;
    serverUrl: string;

    constructor(serverUrl: string, userAgent?: string) {
        this.httpClient = createHttpClient(serverUrl, userAgent);
        this.userAgent = userAgent;
        this.serverUrl = serverUrl;
    }

    post = async <T = any, R = AxiosResponse<T>, D = any>(
        ...args: [url: string, data?: D, config?: AxiosRequestConfig<D>]
    ): Promise<R> => this.httpClient.post(...args);

    get = async <T = any, R = AxiosResponse<T>, D = any>(
        ...args: [url: string, config?: AxiosRequestConfig<D>]
    ): Promise<R> => this.httpClient.get(...args);

    delete = async <T = any, R = AxiosResponse<T>, D = any>(
        ...args: [url: string, config?: AxiosRequestConfig<D>]
    ): Promise<R> => this.httpClient.delete(...args);

    put = async <T = any, R = AxiosResponse<T>, D = any>(
        ...args: [url: string, data?: D, config?: AxiosRequestConfig<D>]
    ): Promise<R> => this.httpClient.put(...args);

    private isAuthorized = (): void => {
        if (!this.isClientAuthorized) {
            throw new RestClientError(Errors.AuthorizationError, {});
        }
    };

    changeServer(serverUrl: string, userAgent = this.userAgent) {
        this.isClientAuthorized = false;
        this.httpClient = createHttpClient(serverUrl, userAgent);
    }

    saveToken(userId: string, authToken: string) {
        if (!userId || !authToken) {
            console.warn('RestClient.saveToken() invalid params');
            return;
        }
        this.httpClient.defaults.headers.common['X-User-Id'] = userId;
        this.httpClient.defaults.headers.common['X-Auth-Token'] = authToken;
        this.isClientAuthorized = true;
    }

    login = async (props: LoginRequestParams): Promise<string | undefined> => {
        const { userName: user, password, token: resume } = props;
        const url = 'login';
        let data;
        if (resume) {
            data = { resume };
        } else if (user && password) {
            data = { user, password };
        }

        return await this.httpClient
            .post(url, data)
            .then((response) => {
                if (response.status === StatusCode.OK && response.data) {
                    const { data: responseData } = response.data;
                    const { userId, authToken } = responseData;
                    this.saveToken(userId, authToken);
                    return authToken;
                } else {
                    throw new RestClientError(
                        Errors.AuthorizationError,
                        response,
                    );
                }
            })
            .catch((error) =>
                handleRestErrorByResponse(error as AxiosErrorWithData),
            );
    };

    createUser = async (
        params: CreateUserRequestParams,
    ): RestResponse<User> => {
        this.isAuthorized();
        const { userName: username, password, name, email, roles } = params;
        try {
            const url = 'users.create';
            const data = {
                username,
                password,
                name,
                email,
                ...(roles?.length && { roles: roles }),
            };
            const response = await this.httpClient.post(url, data);
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(error as AxiosErrorWithData);
        }
    };

    createChannel = async (
        params: CreatePublicChannelRequestParams,
    ): RestResponse<CreatePublicChannelResponse> => {
        this.isAuthorized();
        const { name, members, readOnly, teamId } = params;
        try {
            const url = 'channels.create';
            const data = {
                name,
                members,
                readOnly,
                extraData: {
                    // server will treat chat as encrypted
                    // if we do not pass encrypted: false field
                    encrypted: false,
                    ...(teamId && { teamId }),
                },
            };
            const response = await this.httpClient.post(url, data);
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(
                error as AxiosErrorWithData,
                createRoomErrorHandler,
            );
        }
    };

    createTeam = async (
        params: CreateTeamRequestParams,
    ): RestResponse<CreateTeamResponse> => {
        this.isAuthorized();
        const { name, members, readOnly, isPrivate, encrypted } = params;
        try {
            const url = 'teams.create';
            const data = {
                name,
                members,
                type: isPrivate ? TeamType.Private : TeamType.Public,
                room: {
                    readOnly,
                    extraData: {
                        encrypted,
                    },
                },
            };
            const response = await this.post(url, data);
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(
                error as AxiosErrorWithData,
                createRoomErrorHandler,
            );
        }
    };

    linkChannelsToTeam = async ({
        teamId,
        rooms,
    }: LinkChannelsToTeamRequestParams): RestResponse<LinkChannelsToTeamResponse> => {
        this.isAuthorized();
        try {
            const url = 'teams.addRooms';
            const data = { teamId, rooms };
            const response = await this.post(url, data);
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(error as AxiosErrorWithData);
        }
    };

    createDiscussion = async ({
        pmid,
        prid,
        reply = '',
        t_name,
        users = [],
    }: CreateDiscussionRequestParams): RestResponse<CreateDiscussionResponse> => {
        this.isAuthorized();
        try {
            const url = 'rooms.createDiscussion';
            const data = {
                pmid,
                prid,
                reply,
                t_name,
                users,
            };
            const response = await this.post(url, data);
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(
                error as AxiosErrorWithData,
                createRoomErrorHandler,
            );
        }
    };

    createGroup = async (
        params: CreatePrivateChannelRequestParams,
    ): RestResponse<CreatePrivateChannelResponse> => {
        this.isAuthorized();
        const { name, members, readOnly, encrypted, teamId } = params;
        try {
            const url = 'groups.create';
            const data = {
                name,
                members,
                readOnly,
                extraData: {
                    encrypted,
                    ...(teamId && { teamId }),
                },
            };
            const response = await this.post(url, data);
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(
                error as AxiosErrorWithData,
                createRoomErrorHandler,
            );
        }
    };

    sccCreateConference = async (
        params: SccCreateConferenceRequestParams,
    ): RestResponse<SccCreateConferenceResponse> => {
        this.isAuthorized();
        const url = 'scc.createConference';
        const data = {
            conference: params,
        };
        const response = await this.httpClient.post(url, data);
        validateRestResponse(response);
        return response;
    };

    removeUserFromChannel = async (
        params: RemoveUserFromChannelRequestParams,
    ): RestResponse<RemoveUserFromChannelResponse> => {
        const { rid: roomId, username, roomType } = params;
        const entity = RoomTypeToAPIType[roomType];
        try {
            const response = await this.post(`${entity}.kick`, {
                roomId,
                username,
            });
            validateRestResponse(response);
            return response;
        } catch (error: any) {
            handleRestErrorByResponse(
                error as AxiosErrorWithData,
                removeUserFromRoomErrorHandler,
            );
        }
    };

    createDirectRoom = async (
        username: string,
    ): RestResponse<DirectRoomResponse> => {
        try {
            const response = await this.post('im.create', { username });
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(
                error as AxiosErrorWithData,
                createDirectErrorHandler,
            );
        }
    };

    // Get info about user by its username
    getUserInfoByUsername = async (
        username: string,
    ): RestResponse<UserResponse> => {
        try {
            const response = await this.get('users.info', {
                params: { username: username },
            });
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(
                error as AxiosErrorWithData,
                getUserInfoErrorHandler,
            );
        }
    };

    getSettings = async (
        settings?: Array<SettingsName>,
    ): RestResponse<SettingsData> => {
        try {
            const query = settings?.length
                ? `?query={"_id":{"$in":${JSON.stringify(settings)}}}&count=${
                      settings.length
                  }`
                : '';
            const response = await this.get(`settings.public${query}`);
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(error as AxiosErrorWithData);
        }
    };

    getChannelInfo = async (channelName: string): RestResponse<ChannelData> => {
        this.isAuthorized();
        try {
            const url = 'channels.info';
            const response = await this.httpClient.get(url, {
                params: {
                    roomName: channelName,
                },
            });
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(error as AxiosErrorWithData);
        }
    };

    setUserRole = async ({
        roomId,
        t,
        userId,
        roleName,
        roleValue,
    }: SetUserRoleRequestParams): RestResponse<SetUserRoleResponse> => {
        const action = roleValue ? 'add' : 'remove';
        try {
            const response = await this.post(
                `${RoomTypeToAPIType[t]}.${action}${roleName}`,
                {
                    roomId,
                    userId,
                },
            );
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(
                error as AxiosErrorWithData,
                setUserRoleErrorHandler,
            );
        }
    };

    // remove at scope of SMC-5468
    getRoomInfoByRoomId = async (
        params: GetRoomInfoByRoomIdRequestParams,
    ): RestResponse<GetRoomInfoResponse> => {
        this.isAuthorized();
        try {
            const url = 'rooms.info';
            const response = await this.httpClient.get(url, {
                params: { roomId: params.rid, roomName: params.roomName },
            });
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(
                error as AxiosErrorWithData,
                getRoomInfoErrorHandler,
            );
        }
    };

    getRoomInfo = async (
        params: GetRoomInfoRequestParams,
    ): RestResponse<GetRoomInfoResponse> => {
        this.isAuthorized();
        try {
            const url = 'rooms.info';
            const response = await this.httpClient.get(url, {
                params: { roomId: params.rid, roomName: params.roomName },
            });
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(
                error as AxiosErrorWithData,
                getRoomInfoErrorHandler,
            );
        }
    };

    getHistory = async (
        params: Array<GetHistoryRequestParams>,
    ): RestResponse<GetHistoryData> => {
        this.isAuthorized();
        return await callMeteorRequest({
            httpClient: this.httpClient,
            method: 'loadHistory',
            params,
        });
    };

    getOAuthSettings = async () => {
        this.isAuthorized();
        try {
            const url = 'settings.oauth';
            const response = await this.httpClient.get(url);
            validateRestResponse(response);
            const { data: oauthServices } = response;
            return oauthServices;
        } catch (error) {
            handleRestErrorByResponse(error as AxiosErrorWithData);
        }
    };

    sccGetConferenceInfo = async (
        conferenceNumber: string,
    ): RestResponse<SccGetConferenceInfo> => {
        this.isAuthorized();
        return await callMeteorRequest({
            httpClient: this.httpClient,
            method: 'scc:getConferenceInfo',
            params: [conferenceNumber],
        });
    };

    sccGetFullConferenceInfo = async (
        conferenceNumber: string,
        query: string,
    ): RestResponse<SccGetConferenceInfo> => {
        this.isAuthorized();
        const params: { conferenceNumber: string; username?: string } = {
            conferenceNumber,
        };
        if (query?.length) {
            params['username'] = query;
        }
        try {
            const url = 'scc.getFullConferenceInfo';
            const response = await this.httpClient.get(url, {
                params,
            });
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(error as AxiosErrorWithData);
        }
    };

    sccGetUserConferences = async (
        sort?: string,
        sortOrder?: string,
        offset?: number,
        count?: number,
    ): RestResponse<SccGetUsersConferences> => {
        this.isAuthorized();
        const params = {
            sort,
            sortOrder,
            offset,
            count,
        };
        try {
            const url = 'scc.getUserConferences';
            const response = await this.httpClient.get(url, {
                params,
            });
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(error as AxiosErrorWithData);
        }
    };

    // Update

    addUsersToRoom = async (
        params: Array<AddUsersToRoomRequestParams>,
    ): RestResponse<boolean> => {
        this.isAuthorized();
        return await callMeteorRequest(
            {
                httpClient: this.httpClient,
                method: 'addUsersToRoom',
                params,
            },
            addUserToRoomErrorHandler,
        );
    };

    saveRoomSettings = async (
        params: SaveRoomSettingsRequestParams,
    ): RestResponse<SaveRoomSettingsData> => {
        this.isAuthorized();
        try {
            const url = 'rooms.saveRoomSettings';
            const response = await this.httpClient.post(url, params);
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(
                error as AxiosErrorWithData,
                saveRoomSettingsErrorHandler,
            );
        }
    };

    setUserPreferences = async (
        params: UserPreferencesRequestParams,
    ): RestResponse<UserPreferencesData> => {
        this.isAuthorized();
        const { userId, data } = params;
        try {
            const url = 'users.setPreferences';
            const response = await this.httpClient.post(url, { userId, data });
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(error as AxiosErrorWithData);
        }
    };

    // Send message by name
    sendMessageByGroupName = async (
        params: SendMessageByGroupNameRequestParams,
    ): RestResponse<SendMessageData> => {
        this.isAuthorized();
        const { groupName, msg } = params;
        try {
            const url = 'chat.postMessage';
            const data = {
                channel: `#${groupName}`,
                msg,
            };
            const response = await this.httpClient.post(url, data);
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(error as AxiosErrorWithData);
        }
    };

    sendMessage = async (
        params: SendMessageRequestParams,
    ): Promise<Message> => {
        this.isAuthorized();

        const url = 'chat.sendMessage';
        return await this.post(url, params)
            .then((result) => {
                if (!result) {
                    throw new RestClientError(Errors.EmptyResult, {});
                }
                validateRestResponse(result);
                return result.data.message;
            })
            .catch((error) =>
                handleRestErrorByResponse(
                    error as AxiosErrorWithData,
                    sendMessageErrorHandler,
                ),
            );
    };

    sendAttachment = async (
        params: SendAttachmentRequestParams,
    ): Promise<Message> => {
        this.isAuthorized();
        const { form, rid } = params;
        return await this.post(`rooms.upload/${rid}`, form, {
            headers: form.getHeaders(),
        })
            .then((response) => {
                validateRestResponse(response);
                const message = response.data?.message;
                if (!message) {
                    throw new RestClientError(Errors.EmptyResult, response);
                }
                return message;
            })
            .catch((error) =>
                handleRestErrorByResponse(
                    error as AxiosErrorWithData,
                    sendAttachmentErrorHandler,
                ),
            );
    };

    // Conferences

    sccCallStart = async (
        params: SccCallStartRequestParams,
    ): RestResponse<SccCallStartData> => {
        this.isAuthorized();
        const { conferenceNumber, rid, notify, all } = params;
        return await callMeteorRequest({
            httpClient: this.httpClient,
            method: 'scc:start',
            params: [rid, notify, conferenceNumber, all],
        });
    };

    sccGenerateAccessToken = async (
        jitsiRoomNumber: string,
    ): RestResponse<string> => {
        this.isAuthorized();
        return await callMeteorRequest({
            httpClient: this.httpClient,
            method: 'scc:generateAccessToken',
            params: [jitsiRoomNumber],
        });
    };

    readThread = async (tmid: string): Promise<void> => {
        this.isAuthorized();
        return await callMeteorRequest({
            httpClient: this.httpClient,
            method: 'readThreads',
            params: [tmid],
        });
    };

    readRoom = async (rid: string): RestResponse<ReadRoomResponse> => {
        const url = 'chat.readMessages';
        this.isAuthorized();
        try {
            const result = await this.post(url, {
                rid,
            });
            validateRestResponse(result);
            return result;
        } catch (error) {
            handleRestErrorByResponse(
                error as AxiosErrorWithData,
                readRoomErrorHandler,
            );
        }
    };

    deleteUser = async (userId: string) => {
        this.isAuthorized();
        try {
            const url = 'users.delete';
            const data = {
                userId,
            };
            const response = await this.httpClient.post(url, data);
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(error as AxiosErrorWithData);
        }
    };

    deleteChannel = async (roomId: string) => {
        this.isAuthorized();
        try {
            const url = 'channels.delete';
            const data = {
                roomId,
            };
            const response = await this.httpClient.post(url, data);
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(error as AxiosErrorWithData);
        }
    };

    // Delete private channel or discussion
    deletePrivateChannel = async (roomId: string) => {
        this.isAuthorized();
        try {
            const url = 'groups.delete';
            const data = {
                roomId,
            };
            const response = await this.httpClient.post(url, data);
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(error as AxiosErrorWithData);
        }
    };

    deleteTeam = async (teamId: string) => {
        this.isAuthorized();
        try {
            const url = 'teams.delete';
            const data = {
                teamId,
            };
            const response = await this.httpClient.post(url, data);
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(error as AxiosErrorWithData);
        }
    };

    getCommands = async (
        command?: string,
    ): RestResponse<GetCommandsResponse> => {
        this.isAuthorized();
        const url = 'commands.list';
        try {
            const params = command
                ? {
                      params: {
                          command,
                      },
                  }
                : undefined;
            const response = await this.httpClient.get(url, params);
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(error as AxiosErrorWithData);
        }
    };

    getRolesList = async (): RestResponse<GetRolesListResponse> => {
        this.isAuthorized();
        const url = 'roles.list';
        try {
            const response = await this.httpClient.get(url);
            validateRestResponse(response);
            return response;
        } catch (error) {
            handleRestErrorByResponse(error as AxiosErrorWithData);
        }
    };
}
