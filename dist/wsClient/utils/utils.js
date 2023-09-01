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
exports.isRoomsChangedEvent = exports.getEvent = exports.isServerData = exports.isUnsubscribeResponse = exports.isSubscriptionResponse = exports.isCallResponse = exports.isPongData = exports.isAuthorizedData = exports.isSubscriptionData = exports.hostToWS = exports.getValidHost = exports.getReopenInterval = exports.isLoginResult = exports.isLoginAuthenticated = exports.isLoginOAuth = exports.isLoginPass = exports.loginParams = void 0;
const get_1 = __importDefault(require("lodash/get"));
const js_sha256_1 = require("js-sha256");
const constants_1 = require("../constants");
const loginParams = (credentials) => {
    if (isLoginPass(credentials) ||
        isLoginOAuth(credentials) ||
        isLoginAuthenticated(credentials)) {
        return credentials;
    }
    if (isLoginResult(credentials)) {
        const params = {
            resume: credentials.token,
        };
        return params;
    }
    const params = {
        user: { username: credentials.username },
        password: {
            digest: (0, js_sha256_1.sha256)(credentials.password),
            algorithm: 'sha-256',
        },
    };
    return params;
};
exports.loginParams = loginParams;
/** Password login credential type guard */
function isLoginPass(params) {
    if ('user' in params && 'password' in params) {
        return !!params.user.username && !!params.password.digest;
    }
    else {
        return false;
    }
}
exports.isLoginPass = isLoginPass;
/** Password login credential type guard */
function isLoginOAuth(params) {
    if ('oauth' in params) {
        return (!!params.oauth.credentialToken && !!params.oauth.credentialSecret);
    }
    else {
        return false;
    }
}
exports.isLoginOAuth = isLoginOAuth;
/** Password login credential type guard */
function isLoginAuthenticated(params) {
    if ('resume' in params) {
        return !!params.resume;
    }
    else {
        return false;
    }
}
exports.isLoginAuthenticated = isLoginAuthenticated;
/** Password login credential type guard */
function isLoginResult(params) {
    if ('token' in params) {
        return !!params.token;
    }
    else {
        return false;
    }
}
exports.isLoginResult = isLoginResult;
function getReopenInterval(counter) {
    const interval = constants_1.INITIAL_RECONNECT_INTERVAL * counter;
    return interval > constants_1.MAX_WS_RECONNECT_INTERVAL
        ? constants_1.MAX_WS_RECONNECT_INTERVAL
        : interval;
}
exports.getReopenInterval = getReopenInterval;
const getValidHost = (host) => `${(0, exports.hostToWS)(host)}/websocket`;
exports.getValidHost = getValidHost;
const hostToWS = (host) => {
    const hasSsl = /^https:\/\//.test(host);
    host = host.replace(/^(https?:\/\/)?/, '');
    return `ws${hasSsl ? 's' : ''}://${host}`;
};
exports.hostToWS = hostToWS;
function isSubscriptionData(data) {
    if ('collection' in data && 'msg' in data) {
        return data.msg !== constants_1.WsEventMessage.Added;
    }
    else {
        return false;
    }
}
exports.isSubscriptionData = isSubscriptionData;
function isAuthorizedData(data) {
    if ('collection' in data && 'msg' in data) {
        return data.msg === constants_1.WsEventMessage.Added;
    }
    else {
        return false;
    }
}
exports.isAuthorizedData = isAuthorizedData;
function isPongData(data) {
    if ('msg' in data) {
        return data.msg === constants_1.WsEventMessage.Pong;
    }
    else {
        return false;
    }
}
exports.isPongData = isPongData;
function isCallResponse(data) {
    if ('msg' in data) {
        return data.msg === constants_1.WsEventMessage.Result;
    }
    else {
        return false;
    }
}
exports.isCallResponse = isCallResponse;
function isSubscriptionResponse(data) {
    if ('msg' in data) {
        return data.msg === constants_1.WsEventMessage.Ready;
    }
    else {
        return false;
    }
}
exports.isSubscriptionResponse = isSubscriptionResponse;
function isUnsubscribeResponse(data) {
    if ('msg' in data) {
        return data.msg === constants_1.WsEventMessage.Nosub;
    }
    else {
        return false;
    }
}
exports.isUnsubscribeResponse = isUnsubscribeResponse;
function isServerData(data) {
    return 'server_id' in data;
}
exports.isServerData = isServerData;
function getEvent(data) {
    if (isSubscriptionData(data)) {
        return data.collection;
    }
    else if (isSubscriptionResponse(data)) {
        return data.subs[0];
    }
    else if (isCallResponse(data) || isUnsubscribeResponse(data)) {
        return data.id;
    }
    else if ('id' in data) {
        return data.id;
    }
    else if ('msg' in data) {
        return data.msg;
    }
    else if ('server_id' in data) {
        return undefined;
    }
    else {
        /*
            We cannot used logWarning() here due to third-party
            library import inside the method
        */
        console.warn('Unsupported Event: ', data);
        return undefined;
    }
}
exports.getEvent = getEvent;
function isRoomsChangedEvent(data) {
    const roomsChangedRegExp = RegExp('rooms-changed', 'g');
    const eventName = (0, get_1.default)(data, 'fields.eventName');
    if (eventName !== undefined) {
        return roomsChangedRegExp.test(eventName);
    }
    else {
        return false;
    }
}
exports.isRoomsChangedEvent = isRoomsChangedEvent;
//# sourceMappingURL=utils.js.map