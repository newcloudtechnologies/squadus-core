/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import lodashGet from 'lodash/get';
import { sha256 } from 'js-sha256';

import {
    CredentialsPass,
    CredentialsOAuth,
    CredentialsAuthenticated,
    LoginResult,
    LoginParams,
    SubscriptionData,
    AuthorizedData,
    PongData,
    CallResponseData,
    SubscriptionResponseData,
    UnsubscribeResponseData,
    ServerData,
    WsData,
    RoomsChangedEvent,
} from '../types';
import {
    INITIAL_RECONNECT_INTERVAL,
    MAX_WS_RECONNECT_INTERVAL,
    WsEventMessage,
} from '../constants';

export const loginParams = (
    credentials: LoginParams,
): CredentialsPass | CredentialsOAuth | CredentialsAuthenticated => {
    if (
        isLoginPass(credentials) ||
        isLoginOAuth(credentials) ||
        isLoginAuthenticated(credentials)
    ) {
        return credentials;
    }
    if (isLoginResult(credentials)) {
        const params: CredentialsAuthenticated = {
            resume: credentials.token,
        };
        return params;
    }
    const params: CredentialsPass = {
        user: { username: credentials.username },
        password: {
            digest: sha256(credentials.password),
            algorithm: 'sha-256',
        },
    };
    return params;
};

/** Password login credential type guard */
export function isLoginPass(params: LoginParams): params is CredentialsPass {
    if ('user' in params && 'password' in params) {
        return !!params.user.username && !!params.password.digest;
    } else {
        return false;
    }
}

/** Password login credential type guard */
export function isLoginOAuth(params: LoginParams): params is CredentialsOAuth {
    if ('oauth' in params) {
        return (
            !!params.oauth.credentialToken && !!params.oauth.credentialSecret
        );
    } else {
        return false;
    }
}

/** Password login credential type guard */
export function isLoginAuthenticated(
    params: LoginParams,
): params is CredentialsAuthenticated {
    if ('resume' in params) {
        return !!params.resume;
    } else {
        return false;
    }
}

/** Password login credential type guard */
export function isLoginResult(params: LoginParams): params is LoginResult {
    if ('token' in params) {
        return !!params.token;
    } else {
        return false;
    }
}

export function getReopenInterval(counter: number): number {
    const interval = INITIAL_RECONNECT_INTERVAL * counter;
    return interval > MAX_WS_RECONNECT_INTERVAL
        ? MAX_WS_RECONNECT_INTERVAL
        : interval;
}

export const getValidHost = (host: string): string =>
    `${hostToWS(host)}/websocket`;

export const hostToWS = (host: string): string => {
    const hasSsl = /^https:\/\//.test(host);
    host = host.replace(/^(https?:\/\/)?/, '');
    return `ws${hasSsl ? 's' : ''}://${host}`;
};

export function isSubscriptionData(data: WsData): data is SubscriptionData {
    if ('collection' in data && 'msg' in data) {
        return data.msg !== WsEventMessage.Added;
    } else {
        return false;
    }
}

export function isAuthorizedData(data: WsData): data is AuthorizedData {
    if ('collection' in data && 'msg' in data) {
        return data.msg === WsEventMessage.Added;
    } else {
        return false;
    }
}

export function isPongData(data: WsData): data is PongData {
    if ('msg' in data) {
        return data.msg === WsEventMessage.Pong;
    } else {
        return false;
    }
}

export function isCallResponse(data: WsData): data is CallResponseData {
    if ('msg' in data) {
        return data.msg === WsEventMessage.Result;
    } else {
        return false;
    }
}

export function isSubscriptionResponse(
    data: WsData,
): data is SubscriptionResponseData {
    if ('msg' in data) {
        return data.msg === WsEventMessage.Ready;
    } else {
        return false;
    }
}

export function isUnsubscribeResponse(
    data: WsData,
): data is UnsubscribeResponseData {
    if ('msg' in data) {
        return data.msg === WsEventMessage.Nosub;
    } else {
        return false;
    }
}

export function isServerData(data: WsData): data is ServerData {
    return 'server_id' in data;
}

export function getEvent(data: WsData): string | undefined {
    if (isSubscriptionData(data)) {
        return data.collection;
    } else if (isSubscriptionResponse(data)) {
        return data.subs[0];
    } else if (isCallResponse(data) || isUnsubscribeResponse(data)) {
        return data.id;
    } else if ('id' in data) {
        return data.id;
    } else if ('msg' in data) {
        return data.msg;
    } else if ('server_id' in data) {
        return undefined;
    } else {
        /*
            We cannot used logWarning() here due to third-party 
            library import inside the method
        */
        console.warn('Unsupported Event: ', data);
        return undefined;
    }
}

export function isRoomsChangedEvent(data: WsData): data is RoomsChangedEvent {
    const roomsChangedRegExp = RegExp('rooms-changed', 'g');
    const eventName = lodashGet(data, 'fields.eventName') as string | undefined;
    if (eventName !== undefined) {
        return roomsChangedRegExp.test(eventName);
    } else {
        return false;
    }
}
