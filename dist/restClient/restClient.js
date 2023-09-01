"use strict";
/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestClient = exports.createHttpClient = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../constants");
const constants_2 = require("./constants");
const errorHandlers_1 = require("./errorHandlers");
const getUserInfoErrorHandler_1 = require("./errorHandlers/getUserInfoErrorHandler");
const saveRoomSettingsErrorHandler_1 = require("./errorHandlers/saveRoomSettingsErrorHandler");
const callMeteorRequest_1 = require("./utils/callMeteorRequest");
const validateRestResponse_1 = require("./utils/validateRestResponse");
const handleRestErrorByResponse_1 = require("./utils/handleRestErrorByResponse");
const team_1 = require("../constants/team");
function createHttpClient(serverUrl, userAgent) {
    const userAgentHeader = {
        'User-Agent': userAgent,
    };
    return axios_1.default.create({
        baseURL: `${serverUrl}/api/v1/`,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            ...(userAgent && userAgentHeader),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    });
}
exports.createHttpClient = createHttpClient;
class RestClient {
    constructor(serverUrl, userAgent) {
        this.isClientAuthorized = false;
        this.post = async (...args) => this.httpClient.post(...args);
        this.get = async (...args) => this.httpClient.get(...args);
        this.delete = async (...args) => this.httpClient.delete(...args);
        this.put = async (...args) => this.httpClient.put(...args);
        this.isAuthorized = () => {
            if (!this.isClientAuthorized) {
                throw new errorHandlers_1.RestClientError(constants_2.Errors.AuthorizationError, {});
            }
        };
        this.login = async (props) => {
            const { userName: user, password, token: resume } = props;
            const url = 'login';
            let data;
            if (resume) {
                data = { resume };
            }
            else if (user && password) {
                data = { user, password };
            }
            return await this.httpClient
                .post(url, data)
                .then((response) => {
                if (response.status === constants_2.StatusCode.OK && response.data) {
                    const { data: responseData } = response.data;
                    const { userId, authToken } = responseData;
                    this.saveToken(userId, authToken);
                    return authToken;
                }
                else {
                    throw new errorHandlers_1.RestClientError(constants_2.Errors.AuthorizationError, response);
                }
            })
                .catch((error) => (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error));
        };
        this.createUser = async (params) => {
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
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error);
            }
        };
        this.createChannel = async (params) => {
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
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error, errorHandlers_1.createRoomErrorHandler);
            }
        };
        this.createTeam = async (params) => {
            this.isAuthorized();
            const { name, members, readOnly, isPrivate, encrypted } = params;
            try {
                const url = 'teams.create';
                const data = {
                    name,
                    members,
                    type: isPrivate ? team_1.TeamType.Private : team_1.TeamType.Public,
                    room: {
                        readOnly,
                        extraData: {
                            encrypted,
                        },
                    },
                };
                const response = await this.post(url, data);
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error, errorHandlers_1.createRoomErrorHandler);
            }
        };
        this.linkChannelsToTeam = async ({ teamId, rooms, }) => {
            this.isAuthorized();
            try {
                const url = 'teams.addRooms';
                const data = { teamId, rooms };
                const response = await this.post(url, data);
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error);
            }
        };
        this.createDiscussion = async ({ pmid, prid, reply = '', t_name, users = [], }) => {
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
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error, errorHandlers_1.createRoomErrorHandler);
            }
        };
        this.createGroup = async (params) => {
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
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error, errorHandlers_1.createRoomErrorHandler);
            }
        };
        this.sccCreateConference = async (params) => {
            this.isAuthorized();
            const url = 'scc.createConference';
            const data = {
                conference: params,
            };
            const response = await this.httpClient.post(url, data);
            (0, validateRestResponse_1.validateRestResponse)(response);
            return response;
        };
        this.removeUserFromChannel = async (params) => {
            const { rid: roomId, username, roomType } = params;
            const entity = constants_1.RoomTypeToAPIType[roomType];
            try {
                const response = await this.post(`${entity}.kick`, {
                    roomId,
                    username,
                });
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error, errorHandlers_1.removeUserFromRoomErrorHandler);
            }
        };
        this.createDirectRoom = async (username) => {
            try {
                const response = await this.post('im.create', { username });
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error, errorHandlers_1.createDirectErrorHandler);
            }
        };
        // Get info about user by its username
        this.getUserInfoByUsername = async (username) => {
            try {
                const response = await this.get('users.info', {
                    params: { username: username },
                });
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error, getUserInfoErrorHandler_1.getUserInfoErrorHandler);
            }
        };
        this.getSettings = async (settings) => {
            try {
                const query = settings?.length
                    ? `?query={"_id":{"$in":${JSON.stringify(settings)}}}&count=${settings.length}`
                    : '';
                const response = await this.get(`settings.public${query}`);
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error);
            }
        };
        this.getChannelInfo = async (channelName) => {
            this.isAuthorized();
            try {
                const url = 'channels.info';
                const response = await this.httpClient.get(url, {
                    params: {
                        roomName: channelName,
                    },
                });
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error);
            }
        };
        this.setUserRole = async ({ roomId, t, userId, roleName, roleValue, }) => {
            const action = roleValue ? 'add' : 'remove';
            try {
                const response = await this.post(`${constants_1.RoomTypeToAPIType[t]}.${action}${roleName}`, {
                    roomId,
                    userId,
                });
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error, errorHandlers_1.setUserRoleErrorHandler);
            }
        };
        // remove at scope of SMC-5468
        this.getRoomInfoByRoomId = async (params) => {
            this.isAuthorized();
            try {
                const url = 'rooms.info';
                const response = await this.httpClient.get(url, {
                    params: { roomId: params.rid, roomName: params.roomName },
                });
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error, errorHandlers_1.getRoomInfoErrorHandler);
            }
        };
        this.getRoomInfo = async (params) => {
            this.isAuthorized();
            try {
                const url = 'rooms.info';
                const response = await this.httpClient.get(url, {
                    params: { roomId: params.rid, roomName: params.roomName },
                });
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error, errorHandlers_1.getRoomInfoErrorHandler);
            }
        };
        this.getHistory = async (params) => {
            this.isAuthorized();
            return await (0, callMeteorRequest_1.callMeteorRequest)({
                httpClient: this.httpClient,
                method: 'loadHistory',
                params,
            });
        };
        this.getOAuthSettings = async () => {
            this.isAuthorized();
            try {
                const url = 'settings.oauth';
                const response = await this.httpClient.get(url);
                (0, validateRestResponse_1.validateRestResponse)(response);
                const { data: oauthServices } = response;
                return oauthServices;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error);
            }
        };
        this.sccGetConferenceInfo = async (conferenceNumber) => {
            this.isAuthorized();
            return await (0, callMeteorRequest_1.callMeteorRequest)({
                httpClient: this.httpClient,
                method: 'scc:getConferenceInfo',
                params: [conferenceNumber],
            });
        };
        this.sccGetFullConferenceInfo = async (conferenceNumber, query) => {
            this.isAuthorized();
            const params = {
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
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error);
            }
        };
        this.sccGetUserConferences = async (sort, sortOrder, offset, count) => {
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
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error);
            }
        };
        // Update
        this.addUsersToRoom = async (params) => {
            this.isAuthorized();
            return await (0, callMeteorRequest_1.callMeteorRequest)({
                httpClient: this.httpClient,
                method: 'addUsersToRoom',
                params,
            }, errorHandlers_1.addUserToRoomErrorHandler);
        };
        this.saveRoomSettings = async (params) => {
            this.isAuthorized();
            try {
                const url = 'rooms.saveRoomSettings';
                const response = await this.httpClient.post(url, params);
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error, saveRoomSettingsErrorHandler_1.saveRoomSettingsErrorHandler);
            }
        };
        this.setUserPreferences = async (params) => {
            this.isAuthorized();
            const { userId, data } = params;
            try {
                const url = 'users.setPreferences';
                const response = await this.httpClient.post(url, { userId, data });
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error);
            }
        };
        // Send message by name
        this.sendMessageByGroupName = async (params) => {
            this.isAuthorized();
            const { groupName, msg } = params;
            try {
                const url = 'chat.postMessage';
                const data = {
                    channel: `#${groupName}`,
                    msg,
                };
                const response = await this.httpClient.post(url, data);
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error);
            }
        };
        this.sendMessage = async (params) => {
            this.isAuthorized();
            const url = 'chat.sendMessage';
            return await this.post(url, params)
                .then((result) => {
                if (!result) {
                    throw new errorHandlers_1.RestClientError(constants_2.Errors.EmptyResult, {});
                }
                (0, validateRestResponse_1.validateRestResponse)(result);
                return result.data.message;
            })
                .catch((error) => (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error, errorHandlers_1.sendMessageErrorHandler));
        };
        this.sendAttachment = async (params) => {
            this.isAuthorized();
            const { form, rid } = params;
            return await this.post(`rooms.upload/${rid}`, form, {
                headers: form.getHeaders(),
            })
                .then((response) => {
                (0, validateRestResponse_1.validateRestResponse)(response);
                const message = response.data?.message;
                if (!message) {
                    throw new errorHandlers_1.RestClientError(constants_2.Errors.EmptyResult, response);
                }
                return message;
            })
                .catch((error) => (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error, errorHandlers_1.sendAttachmentErrorHandler));
        };
        // Conferences
        this.sccCallStart = async (params) => {
            this.isAuthorized();
            const { conferenceNumber, rid, notify, all } = params;
            return await (0, callMeteorRequest_1.callMeteorRequest)({
                httpClient: this.httpClient,
                method: 'scc:start',
                params: [rid, notify, conferenceNumber, all],
            });
        };
        this.sccGenerateAccessToken = async (jitsiRoomNumber) => {
            this.isAuthorized();
            return await (0, callMeteorRequest_1.callMeteorRequest)({
                httpClient: this.httpClient,
                method: 'scc:generateAccessToken',
                params: [jitsiRoomNumber],
            });
        };
        this.readThread = async (tmid) => {
            this.isAuthorized();
            return await (0, callMeteorRequest_1.callMeteorRequest)({
                httpClient: this.httpClient,
                method: 'readThreads',
                params: [tmid],
            });
        };
        this.readRoom = async (rid) => {
            const url = 'chat.readMessages';
            this.isAuthorized();
            try {
                const result = await this.post(url, {
                    rid,
                });
                (0, validateRestResponse_1.validateRestResponse)(result);
                return result;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error, errorHandlers_1.readRoomErrorHandler);
            }
        };
        this.deleteUser = async (userId) => {
            this.isAuthorized();
            try {
                const url = 'users.delete';
                const data = {
                    userId,
                };
                const response = await this.httpClient.post(url, data);
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error);
            }
        };
        this.deleteChannel = async (roomId) => {
            this.isAuthorized();
            try {
                const url = 'channels.delete';
                const data = {
                    roomId,
                };
                const response = await this.httpClient.post(url, data);
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error);
            }
        };
        // Delete private channel or discussion
        this.deletePrivateChannel = async (roomId) => {
            this.isAuthorized();
            try {
                const url = 'groups.delete';
                const data = {
                    roomId,
                };
                const response = await this.httpClient.post(url, data);
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error);
            }
        };
        this.deleteTeam = async (teamId) => {
            this.isAuthorized();
            try {
                const url = 'teams.delete';
                const data = {
                    teamId,
                };
                const response = await this.httpClient.post(url, data);
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error);
            }
        };
        this.getCommands = async (command) => {
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
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error);
            }
        };
        this.getRolesList = async () => {
            this.isAuthorized();
            const url = 'roles.list';
            try {
                const response = await this.httpClient.get(url);
                (0, validateRestResponse_1.validateRestResponse)(response);
                return response;
            }
            catch (error) {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error);
            }
        };
        this.httpClient = createHttpClient(serverUrl, userAgent);
        this.userAgent = userAgent;
        this.serverUrl = serverUrl;
    }
    changeServer(serverUrl, userAgent = this.userAgent) {
        this.isClientAuthorized = false;
        this.httpClient = createHttpClient(serverUrl, userAgent);
    }
    saveToken(userId, authToken) {
        if (!userId || !authToken) {
            console.warn('RestClient.saveToken() invalid params');
            return;
        }
        this.httpClient.defaults.headers.common['X-User-Id'] = userId;
        this.httpClient.defaults.headers.common['X-Auth-Token'] = authToken;
        this.isClientAuthorized = true;
    }
}
exports.RestClient = RestClient;
//# sourceMappingURL=restClient.js.map