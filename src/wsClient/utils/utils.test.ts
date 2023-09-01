/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import { sha256 } from 'js-sha256';

import {
    INITIAL_RECONNECT_INTERVAL,
    MAX_WS_RECONNECT_INTERVAL,
} from '../constants';
import {
    loginParams,
    getEvent,
    getReopenInterval,
    hostToWS,
    isAuthorizedData,
    isCallResponse,
    isLoginAuthenticated,
    isLoginOAuth,
    isLoginPass,
    isLoginResult,
    isPongData,
    isServerData,
    isSubscriptionData,
    isSubscriptionResponse,
    isUnsubscribeResponse,
    getValidHost,
} from '../utils';

//call response:
const logoutResponse = { id: 'ddp-6', msg: 'result' };
const loginResponse = {
    msg: 'result',
    id: 'ddp-1',
    result: {
        id: '8QbMnnnWxeSLQmuQ9',
        token: 'WR_UWZh8Yz4ohwEnLidyBTvhVIYeg5YNXvgaqLtx_fu',
        tokenExpires: { $date: 1687427330224 },
        type: 'resume',
    },
};

const callResponse = loginResponse;
const subscriptionData = {
    msg: 'changed',
    collection: 'stream-notify-user',
    id: 'id',
    fields: {
        eventName: '8QbMnnnWxeSLQmuQ9/rooms-changed',
        args: [],
    },
};

const unsubscribeResponse = { msg: 'nosub', id: 'ddp-2' };
const authorizedData = {
    msg: 'added',
    collection: 'users',
    id: '8QbMnnnWxeSLQmuQ9',
    fields: { emails: ['example@mail.ru'], username: 'example' },
};

const MESSAGE_PONG = 'pong';
const pongData = { msg: MESSAGE_PONG };
const subscriptionResponse = { msg: 'ready', subs: ['ddp-2'] };
const serverData = { server_id: '0' };

const DATA_ID = 'someId';
const dataId = { id: DATA_ID };

const SERVER_ID = 'someServerId';
const serverId = { server_id: SERVER_ID };

const wsEvents = {
    callResponse,
    subscriptionData,
    unsubscribeResponse,
    authorizedData,
    pongData,
    subscriptionResponse,
    serverData,
};

const USERNAME = 'username';
const PASSWORD = 'password';

describe('wsClient utils', () => {
    describe('isLoginPass', () => {
        it('should return true on correct data', () => {
            const correctLoginPass = {
                user: {
                    username: USERNAME,
                },
                password: {
                    digest: PASSWORD,
                    algorithm: 'sha-256',
                },
            };

            expect(isLoginPass(correctLoginPass)).toBeTruthy();
        });
        it('should return false on empty strings', () => {
            const wrongLoginPass = {
                user: {
                    username: '',
                },
                password: {
                    digest: '',
                    algorithm: 'sha-256',
                },
            };
            expect(isLoginPass(wrongLoginPass)).toBeFalsy();
        });
    });

    describe('isLoginOAuth', () => {
        it('should return true on correct data', () => {
            const correctCredentialsOAuth = {
                oauth: {
                    credentialToken: 'token',
                    credentialSecret: 'secret',
                },
            };

            expect(isLoginOAuth(correctCredentialsOAuth)).toBeTruthy();
        });
        it('should return false on empty strings', () => {
            const wrongCredentialsOAuth = {
                oauth: {
                    credentialToken: '',
                    credentialSecret: '',
                },
            };
            expect(isLoginOAuth(wrongCredentialsOAuth)).toBeFalsy();
        });
    });

    describe('isLoginAuthenticated', () => {
        it('should return true on correct data', () => {
            const correctCredentialsAuthenticated = {
                resume: 'token',
            };

            expect(
                isLoginAuthenticated(correctCredentialsAuthenticated),
            ).toBeTruthy();
        });
        it('should return false on empty strings', () => {
            const wrongCredentialsAuthenticated = {
                resume: '',
            };
            expect(
                isLoginAuthenticated(wrongCredentialsAuthenticated),
            ).toBeFalsy();
        });
    });

    describe('isLoginResult', () => {
        it('should return true on correct data', () => {
            const correctCredentialsAuthenticated = {
                token: 'token',
            };

            // @ts-expect-error wrong type on purpose
            expect(isLoginResult(correctCredentialsAuthenticated)).toBeTruthy();
        });
        it('should return false on empty strings', () => {
            const wrongCredentialsAuthenticated = {
                token: '',
            };
            // @ts-expect-error wrong type on purpose
            expect(isLoginResult(wrongCredentialsAuthenticated)).toBeFalsy();
        });
    });

    describe('getReopenInterval', () => {
        const counter = MAX_WS_RECONNECT_INTERVAL / INITIAL_RECONNECT_INTERVAL;
        it('should return MAX INTERVAL if counter is height ', () => {
            expect(getReopenInterval(counter)).toBe(MAX_WS_RECONNECT_INTERVAL);
        });
        it('should return correct interval', () => {
            const interval = INITIAL_RECONNECT_INTERVAL * (counter - 1);
            expect(getReopenInterval(counter - 1)).toBe(interval);
        });
    });

    describe('hostToWS', () => {
        it('should return ws host with ssl', () => {
            expect(hostToWS('https://im.example.ru')).toBe(
                'wss://im.example.ru',
            );
        });
        it('should return ws host without ssl', () => {
            expect(hostToWS('http://im.example.ru')).toBe('ws://im.example.ru');
        });
    });

    describe('isSubscriptionData', () => {
        it('should return true only with subscriptionData ', () => {
            const filterResult = Object.entries(wsEvents).filter(([, object]) =>
                // @ts-expect-error wrong type on purpose
                isSubscriptionData(object),
            );
            expect(filterResult.length).toBe(1);
            expect(filterResult[0][0]).toBe('subscriptionData');
        });
    });

    describe('isAuthorizedData', () => {
        it('should return true only with authorizedData', () => {
            const filterResult = Object.entries(wsEvents).filter(([, object]) =>
                // @ts-expect-error wrong type on purpose
                isAuthorizedData(object),
            );
            expect(filterResult.length).toBe(1);
            expect(filterResult[0][0]).toBe('authorizedData');
        });
    });

    describe('isPongData', () => {
        it('should return true only with pongData', () => {
            const filterResult = Object.entries(wsEvents).filter(([, object]) =>
                // @ts-expect-error wrong type on purpose
                isPongData(object),
            );
            expect(filterResult.length).toBe(1);
            expect(filterResult[0][0]).toBe('pongData');
        });
    });

    describe('isCallResponse', () => {
        it('should return true only with callResponse', () => {
            const filterResult = Object.entries(wsEvents).filter(([, object]) =>
                // @ts-expect-error wrong type on purpose
                isCallResponse(object),
            );
            expect(filterResult.length).toBe(1);
            expect(filterResult[0][0]).toBe('callResponse');
        });
        it('should return true with each callResponse', () => {
            const callResponseArray = [logoutResponse, loginResponse];
            const filterResult = callResponseArray.filter((item) =>
                // @ts-expect-error wrong type on purpose
                isCallResponse(item),
            );
            expect(filterResult.length).toBe(callResponseArray.length);
        });
    });

    describe('isSubscriptionResponse', () => {
        it('should return true only with subscriptionResponse', () => {
            const filterResult = Object.entries(wsEvents).filter(([, object]) =>
                // @ts-expect-error wrong type on purpose
                isSubscriptionResponse(object),
            );
            expect(filterResult.length).toBe(1);
            expect(filterResult[0][0]).toBe('subscriptionResponse');
        });
    });

    describe('isUnsubscribeResponse', () => {
        it('should return true only with unsubscribeResponse', () => {
            const filterResult = Object.entries(wsEvents).filter(([, object]) =>
                // @ts-expect-error wrong type on purpose
                isUnsubscribeResponse(object),
            );
            expect(filterResult.length).toBe(1);
            expect(filterResult[0][0]).toBe('unsubscribeResponse');
        });
    });

    describe('isServerData', () => {
        it('should return true only with serverData', () => {
            const filterResult = Object.entries(wsEvents).filter(([, object]) =>
                // @ts-expect-error wrong type on purpose
                isServerData(object),
            );
            expect(filterResult.length).toBe(1);
            expect(filterResult[0][0]).toBe('serverData');
        });
    });

    getEvent;
    describe('getEvent', () => {
        it('should return collection on subscriptionData', () => {
            // @ts-expect-error wrong type on purpose
            const event = getEvent(subscriptionData);
            expect(event).toBe('stream-notify-user');
        });
        it('should return sub id on subscriptionResponse', () => {
            // @ts-expect-error wrong type on purpose
            const event = getEvent(subscriptionResponse);
            expect(event).toBe('ddp-2');
        });
        it('should return sub id on unsubscribeResponse', () => {
            // @ts-expect-error wrong type on purpose
            const event = getEvent(unsubscribeResponse);
            expect(event).toBe('ddp-2');
        });
        it('should return sub id on callResponse', () => {
            // @ts-expect-error wrong type on purpose
            const event = getEvent(callResponse);
            expect(event).toBe('ddp-1');
        });
        it('should return "pong" on pongData', () => {
            // @ts-expect-error wrong type on purpose
            const event = getEvent(pongData);
            expect(event).toBe(MESSAGE_PONG);
        });
        it('should return "someId" on dataId', () => {
            // @ts-expect-error wrong type on purpose
            const event = getEvent(dataId);
            expect(event).toBe(DATA_ID);
        });
        it('should return undefined on serverId', () => {
            const event = getEvent(serverId);
            expect(event).toBeUndefined();
        });
        it('should return undefined on unsupported event', () => {
            const event = getEvent({ error: new Error() });
            expect(event).toBeUndefined();
        });
    });

    describe('getValidHost', () => {
        const host = 'im.host.ru';
        const hostWithSsl = `https://${host}`;
        it('should return modified host address', () => {
            expect(getValidHost(host)).toBe(`ws://${host}/websocket`);
        });
        it('should return modified host address with additional S in prefix', () => {
            expect(getValidHost(hostWithSsl)).toBe(`wss://${host}/websocket`);
        });
    });

    describe('loginParams', () => {
        it('should return source login credentials', () => {
            const correctLoginPass = {
                user: {
                    username: USERNAME,
                },
                password: {
                    digest: PASSWORD,
                    algorithm: 'sha-256',
                },
            };
            expect(loginParams(correctLoginPass)).toBe(correctLoginPass);
        });
        it('should return source OAuth credentials', () => {
            const correctCredentialsOAuth = {
                oauth: {
                    credentialToken: 'token',
                    credentialSecret: 'secret',
                },
            };
            expect(loginParams(correctCredentialsOAuth)).toBe(
                correctCredentialsOAuth,
            );
        });
        it('should return source authenticated credentials', () => {
            const correctCredentialsAuthenticated = {
                resume: 'token',
            };
            expect(loginParams(correctCredentialsAuthenticated)).toBe(
                correctCredentialsAuthenticated,
            );
        });
        it('should rename "token" key to "resume" key', () => {
            const sourceCredentialsAuthenticated = {
                token: 'token',
            };
            const correctCredentialsAuthenticated = {
                resume: 'token',
            };
            // @ts-expect-error wrong type on purpose
            expect(loginParams(sourceCredentialsAuthenticated)).toStrictEqual(
                correctCredentialsAuthenticated,
            );
        });
        it('should return correctly reformated credentials', () => {
            const credentials = {
                username: USERNAME,
                password: PASSWORD,
            };
            const responseCredentials = {
                user: { username: credentials.username },
                password: {
                    digest: sha256(credentials.password),
                    algorithm: 'sha-256',
                },
            };
            expect(loginParams(credentials)).toStrictEqual(responseCredentials);
        });
    });
});
