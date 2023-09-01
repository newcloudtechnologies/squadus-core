/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import WebSocket from 'universal-ws-client';
import { BehaviorSubject, Subject, filter, take, Subscription } from 'rxjs';

import {
    getReopenInterval,
    loginParams,
    getEvent,
    isSubscriptionResponse,
    getValidHost,
} from './utils';
import {
    Collections,
    CommonEventNames,
    DEFAULT_PING_MS,
    Method,
    WsEventMessage,
    NO_ID_MSG_REG_EXP,
    RESPONSE_TIMEOUT,
    Status,
    USER_DISCONNECT_CODE_CLOSE,
    UserEventNames,
    RoomEventNames,
} from './constants';
import {
    LoginResult,
    WsSubscription,
    LoginParams,
    WsData,
    SendParams,
    SubscriptionResponseData,
    SendResponse,
    UnsubscribeResponseData,
    CallResponseData,
    ResponseError,
} from './types';

export class WSClient {
    events$: Subject<WsData> = new Subject();
    status$ = new BehaviorSubject<Status>(Status.Closed);
    host: string;
    pingTimeout?: ReturnType<typeof setTimeout> | number;
    openTimeout?: ReturnType<typeof setTimeout> | number;
    config: { host: string; ping: number };
    connection?: WebSocket;
    lastPing = 0;
    subscriptions: { [id: string]: WsSubscription } = {};
    userId: string | null;
    resume: LoginResult | null;
    counter = 0;
    reopenCounter = 0;

    constructor(host: string, ping = DEFAULT_PING_MS) {
        if (!host) {
            throw '[wsClient] constructor() wrong host argument';
        }
        this.config = {
            host,
            ping,
        };
        this.userId = null;
        this.resume = null;
        this.host = getValidHost(host);

        this.on(WsEventMessage.Ping, async () => {
            this.lastPing = Date.now();
            try {
                await this.send({ msg: WsEventMessage.Pong });
            } catch (error) {
                console.error(`[wsClient] Send pong error: `, error);
            }
        });
    }

    private _onOpen = async (callback: () => void): Promise<void> => {
        this.lastPing = Date.now();
        try {
            await this.send({
                msg: WsEventMessage.Connect,
                version: '1',
                support: ['1', 'pre2', 'pre1'],
            });
        } catch (error) {
            console.error(`[wsClient] _onOpen() error: `, error);
        }

        this.status$.next(Status.Open);
        this.reopenCounter = 0;
        clearInterval(this.openTimeout);
        this.openTimeout = 0;
        callback();
        this._ping();
    };

    private _onClose = (event: WebSocket.CloseEvent): void => {
        this.status$.next(Status.Closed);
        if (event.code !== USER_DISCONNECT_CODE_CLOSE) {
            this.reopen();
        }
    };

    private _ping = async (): Promise<void> => {
        this.pingTimeout && clearTimeout(this.pingTimeout);
        this.pingTimeout = setTimeout(async () => {
            try {
                await this.send({ msg: WsEventMessage.Ping });
                this._ping();
            } catch (error) {
                this.reopen();
                console.error(`[wsClient] _ping() error: `, error);
            }
        }, this.config.ping);
    };

    private _call = async (
        method: string,
        ...params: unknown[]
    ): Promise<{ [key: string]: unknown } | undefined> => {
        try {
            const response = (await this.send({
                msg: WsEventMessage.Method,
                method,
                params,
            })) as CallResponseData;
            return response?.result;
        } catch (error) {
            console.error(`[wsClient] _call() error: `, error);
            throw error;
        }
    };

    private _getMsgId = (message: SendParams): string => {
        return message.id || `ddp-${this.counter++}`;
    };

    private _unsubscribeAll = async (): Promise<void> => {
        const unsubscribeArray = Object.keys(this.subscriptions).map(
            async (id) => {
                return this.subscriptions[id]?.unsubscribe();
            },
        );
        try {
            await Promise.all(unsubscribeArray);
            this.subscriptions = {};
        } catch (error) {
            console.error(`[wsClient] _unsubscribeAll() error: `, error);
        }
    };

    open = async (): Promise<void> => {
        return new Promise((resolve, reject) => {
            let connection: WebSocket;
            if (this.isConnected()) {
                this._ping();
                return resolve();
            }
            try {
                connection = new WebSocket(this.host) as WebSocket;
                connection.onerror = reject;
            } catch (error) {
                const wsError = error as WebSocket.ErrorEvent;
                console.error(`[wsClient] open() error: ${wsError.message}`);
                return reject(wsError.message);
            }
            if (this.connection != undefined) {
                this.connection.terminate();
            }

            this.connection = connection;
            this.connection.onmessage = this.onMessage.bind(this);
            this.connection.onclose = this._onClose.bind(this);
            this.connection.onopen = this._onOpen.bind(this, resolve);
            this.status$.next(Status.Connecting);
        });
    };

    isConnected(): boolean {
        return !!(
            this.connection?.readyState === Status.Open && this.isAlive()
        );
    }

    onMessage = (event: WebSocket.MessageEvent): void => {
        this.lastPing = Date.now();
        if ('data' in event) {
            const eventData = event.data as string;
            const data = JSON.parse(eventData) as WsData;
            this.events$.next(data);
        }
    };

    close = async (): Promise<void> => {
        if (!this.connection) {
            return Promise.reject('Connection is undefined');
        }

        this.status$.next(Status.Closing);
        await this._unsubscribeAll();

        this.openTimeout && clearTimeout(this.openTimeout);
        this.pingTimeout && clearTimeout(this.pingTimeout);

        if (this.isConnected()) {
            try {
                return new Promise<void>((resolve, reject) => {
                    this.once(WsEventMessage.Close, (data: WsData) => {
                        if ('error' in data) {
                            reject(data.error);
                        } else {
                            resolve();
                        }
                    });
                });
            } catch (error) {
                throw `[wsClient] close() error: ${error}`;
            } finally {
                this.connection.close(USER_DISCONNECT_CODE_CLOSE);
            }
        }

        return Promise.resolve();
    };

    reopen = async (): Promise<void> => {
        if (this.openTimeout) {
            return;
        }
        this.openTimeout = setTimeout(async () => {
            this.openTimeout = 0;
            try {
                await this.open();
            } catch (error) {
                console.error(`[wsClient] reopen() error: `, error);
                this.reopen();
            }
        }, getReopenInterval(this.reopenCounter++));
    };

    once = (
        listener: string,
        cb: (data: WsData | ResponseError) => void,
        timeout: number = RESPONSE_TIMEOUT,
    ): (() => void) => {
        const responseSubscription = this.events$
            .pipe(
                filter(
                    (data: WsData) =>
                        getEvent(data) === listener ||
                        getEvent(data) === WsEventMessage.Disconnected,
                ),
                take(1),
            )
            .subscribe((data: WsData) => {
                clearTimeout(responseTimeoutId);
                if (getEvent(data) === WsEventMessage.Disconnected) {
                    const error = {
                        error: {
                            message: `Disconnected`,
                        },
                    };
                    cb(error);
                } else {
                    cb(data as WsData);
                }
            });

        const responseTimeoutId = setTimeout(() => {
            responseSubscription.unsubscribe();
            const error = {
                error: {
                    message: `Can't receive response for event: "${listener}"`,
                },
            };
            cb(error);
        }, timeout);

        const unsubscribe = (): void => {
            responseSubscription.unsubscribe();
            clearTimeout(responseTimeoutId);
        };

        return unsubscribe;
    };

    on = (event: string, cb: (data: WsData) => void): Subscription => {
        return this.events$
            .pipe(filter((data) => getEvent(data) === event))
            .subscribe((data) => cb(data));
    };

    send = async (message: SendParams): Promise<SendResponse | undefined> => {
        /* eslint-disable no-async-promise-executor */
        return new Promise<SendResponse>(async (resolve, reject) => {
            if (!this.connection) {
                throw 'Sending message without open connection';
            }

            const modelObjectId = NO_ID_MSG_REG_EXP.test(message.msg)
                ? {}
                : { id: this._getMsgId(message) };
            const data = {
                ...message,
                ...modelObjectId,
            };
            const stringData = JSON.stringify(data);

            try {
                this.connection.send(stringData);
            } catch (error: unknown) {
                const wsError = error as Error;
                console.error(
                    `[wsClient] send() error: sending data ${wsError.message}`,
                );
                reject(wsError.message);
            }

            const listener =
                (data.msg === WsEventMessage.Ping && WsEventMessage.Pong) ||
                (data.msg === WsEventMessage.Connect &&
                    WsEventMessage.Connected) ||
                data.id;
            if (listener === undefined) {
                return resolve(undefined);
            }

            this.once(listener, (result: WsData | ResponseError) => {
                const sendResult = result as SendResponse | ResponseError;
                if (sendResult && 'error' in sendResult) {
                    reject(sendResult.error.message);
                } else {
                    resolve(sendResult);
                }
            });
        });
    };

    isAlive = (): boolean => {
        if (!this.lastPing) {
            return false;
        }
        return (
            Date.now() - this.lastPing <= this.config.ping + RESPONSE_TIMEOUT
        );
    };

    login = async (credentials: LoginParams): Promise<LoginResult> => {
        const params = loginParams(credentials);
        try {
            this.resume = (await this._call(
                Method.Login,
                params,
            )) as LoginResult;
            await this.subscribeAll();
        } catch (error) {
            console.error(`[wsClient] login() error: `, error);
            throw error;
        }

        this.userId = this.resume.id;
        return this.resume;
    };

    logout = async (): Promise<void> => {
        this.resume = null;
        await this._unsubscribeAll();
        await this._call(Method.Logout);
    };

    subscribe = async (
        name: string,
        params: unknown[],
        id?: string,
    ): Promise<WsSubscription | undefined> => {
        try {
            const response = (await this.send({
                msg: WsEventMessage.Sub,
                id,
                name,
                params,
            })) as SubscriptionResponseData | UnsubscribeResponseData;

            if (isSubscriptionResponse(response)) {
                id = response.subs[0];
                const unsubscribe = this.unsubscribe.bind(
                    this,
                    id,
                ) as () => Promise<UnsubscribeResponseData>;

                const subscription = {
                    id,
                    name,
                    params,
                    unsubscribe,
                };
                this.subscriptions[id] = subscription;
                return subscription;
            }
        } catch (error) {
            console.error(`[wsClient] subscribe() error: `, error);
            throw error;
        }
    };

    subscribeAll = async (): Promise<void> => {
        try {
            const subscriptions = Object.keys(this.subscriptions).map(
                async (key) => {
                    const { name, params, id } = this.subscriptions[key];
                    return this.subscribe(name, params, id);
                },
            );
            await Promise.all(subscriptions);
        } catch (error) {
            console.error(`[wsClient] subscribeAll() error: `, error);
        }
    };

    unsubscribe = async (id: string): Promise<UnsubscribeResponseData> => {
        if (id in this.subscriptions) {
            delete this.subscriptions[id];
        } else {
            return Promise.reject(`Id: ${id} does't exist`);
        }

        try {
            const response = (await this.send({
                msg: WsEventMessage.Unsub,
                id,
            })) as UnsubscribeResponseData;
            return response;
        } catch (error) {
            console.error(`[wsClient] unsubscribe() error: `, error);
            throw error;
        }
    };

    subscribeNotifyAll = async (): Promise<(WsSubscription | undefined)[]> => {
        return Promise.all(
            [
                CommonEventNames.PermissionsChanged,
                CommonEventNames.PublicSettingsChanged,
                CommonEventNames.DeleteEmojiCustom,
                CommonEventNames.RolesChange,
                CommonEventNames.UpdateAvatar,
                CommonEventNames.UpdateEmojiCustom,
            ].map(async (event) =>
                this.subscribe(Collections.StreamNotifyAll, [
                    event,
                    { useCollection: false, args: [false] },
                ]),
            ),
        );
    };

    subscribeLoggedNotify = async (): Promise<
        (WsSubscription | undefined)[]
    > => {
        return Promise.all(
            [
                CommonEventNames.DeleteEmojiCustom,
                CommonEventNames.RolesChange,
                CommonEventNames.UpdateAvatar,
                CommonEventNames.UpdateEmojiCustom,
                CommonEventNames.UsersDeleted,
                CommonEventNames.UsersNameChanged,
            ].map(async (event) =>
                this.subscribe(Collections.streamNotifyLogged, [
                    event,
                    { useCollection: false, args: [false] },
                ]),
            ),
        );
    };

    subscribeNotifyUser = async (): Promise<(WsSubscription | undefined)[]> => {
        return Promise.all(
            [
                UserEventNames.E2EKeyRequest,
                UserEventNames.Message,
                UserEventNames.Notification,
                UserEventNames.Otr,
                UserEventNames.RoomsChanged,
                UserEventNames.SubscriptionsChanged,
                UserEventNames.UiInteraction,
                UserEventNames.UserData,
                UserEventNames.Webrtc,
                UserEventNames.ConferenceChanged,
            ].map(async (event) =>
                this.subscribe(Collections.StreamNotifyUser, [
                    `${this.userId}/${event}`,
                    { useCollection: false, args: [false] },
                ]),
            ),
        );
    };

    subscribeRoom = async (
        rid: string,
        ...args: unknown[]
    ): Promise<(WsSubscription | undefined)[]> => {
        return Promise.all([
            this.subscribe(Collections.StreamRoomMessages, [
                rid,
                { useCollection: false, args: args },
            ]),

            this.subscribe(Collections.StreamNotifyRoom, [
                `${rid}/${RoomEventNames.Typing}`,
                { useCollection: false, args: args },
            ]),
            this.subscribe(Collections.StreamNotifyRoom, [
                `${rid}/${RoomEventNames.DeleteMessage}`,
                { useCollection: false, args: args },
            ]),
        ]);
    };
}
