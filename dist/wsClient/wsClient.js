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
exports.WSClient = void 0;
const universal_ws_client_1 = __importDefault(require("universal-ws-client"));
const rxjs_1 = require("rxjs");
const utils_1 = require("./utils");
const constants_1 = require("./constants");
class WSClient {
    constructor(host, ping = constants_1.DEFAULT_PING_MS) {
        this.events$ = new rxjs_1.Subject();
        this.status$ = new rxjs_1.BehaviorSubject(constants_1.Status.Closed);
        this.lastPing = 0;
        this.subscriptions = {};
        this.counter = 0;
        this.reopenCounter = 0;
        this._onOpen = async (callback) => {
            this.lastPing = Date.now();
            try {
                await this.send({
                    msg: constants_1.WsEventMessage.Connect,
                    version: '1',
                    support: ['1', 'pre2', 'pre1'],
                });
            }
            catch (error) {
                console.error(`[wsClient] _onOpen() error: `, error);
            }
            this.status$.next(constants_1.Status.Open);
            this.reopenCounter = 0;
            clearInterval(this.openTimeout);
            this.openTimeout = 0;
            callback();
            this._ping();
        };
        this._onClose = (event) => {
            this.status$.next(constants_1.Status.Closed);
            if (event.code !== constants_1.USER_DISCONNECT_CODE_CLOSE) {
                this.reopen();
            }
        };
        this._ping = async () => {
            this.pingTimeout && clearTimeout(this.pingTimeout);
            this.pingTimeout = setTimeout(async () => {
                try {
                    await this.send({ msg: constants_1.WsEventMessage.Ping });
                    this._ping();
                }
                catch (error) {
                    this.reopen();
                    console.error(`[wsClient] _ping() error: `, error);
                }
            }, this.config.ping);
        };
        this._call = async (method, ...params) => {
            try {
                const response = (await this.send({
                    msg: constants_1.WsEventMessage.Method,
                    method,
                    params,
                }));
                return response?.result;
            }
            catch (error) {
                console.error(`[wsClient] _call() error: `, error);
                throw error;
            }
        };
        this._getMsgId = (message) => {
            return message.id || `ddp-${this.counter++}`;
        };
        this._unsubscribeAll = async () => {
            const unsubscribeArray = Object.keys(this.subscriptions).map(async (id) => {
                return this.subscriptions[id]?.unsubscribe();
            });
            try {
                await Promise.all(unsubscribeArray);
                this.subscriptions = {};
            }
            catch (error) {
                console.error(`[wsClient] _unsubscribeAll() error: `, error);
            }
        };
        this.open = async () => {
            return new Promise((resolve, reject) => {
                let connection;
                if (this.isConnected()) {
                    this._ping();
                    return resolve();
                }
                try {
                    connection = new universal_ws_client_1.default(this.host);
                    connection.onerror = reject;
                }
                catch (error) {
                    const wsError = error;
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
                this.status$.next(constants_1.Status.Connecting);
            });
        };
        this.onMessage = (event) => {
            this.lastPing = Date.now();
            if ('data' in event) {
                const eventData = event.data;
                const data = JSON.parse(eventData);
                this.events$.next(data);
            }
        };
        this.close = async () => {
            if (!this.connection) {
                return Promise.reject('Connection is undefined');
            }
            this.status$.next(constants_1.Status.Closing);
            await this._unsubscribeAll();
            this.openTimeout && clearTimeout(this.openTimeout);
            this.pingTimeout && clearTimeout(this.pingTimeout);
            if (this.isConnected()) {
                try {
                    return new Promise((resolve, reject) => {
                        this.once(constants_1.WsEventMessage.Close, (data) => {
                            if ('error' in data) {
                                reject(data.error);
                            }
                            else {
                                resolve();
                            }
                        });
                    });
                }
                catch (error) {
                    throw `[wsClient] close() error: ${error}`;
                }
                finally {
                    this.connection.close(constants_1.USER_DISCONNECT_CODE_CLOSE);
                }
            }
            return Promise.resolve();
        };
        this.reopen = async () => {
            if (this.openTimeout) {
                return;
            }
            this.openTimeout = setTimeout(async () => {
                this.openTimeout = 0;
                try {
                    await this.open();
                }
                catch (error) {
                    console.error(`[wsClient] reopen() error: `, error);
                    this.reopen();
                }
            }, (0, utils_1.getReopenInterval)(this.reopenCounter++));
        };
        this.once = (listener, cb, timeout = constants_1.RESPONSE_TIMEOUT) => {
            const responseSubscription = this.events$
                .pipe((0, rxjs_1.filter)((data) => (0, utils_1.getEvent)(data) === listener ||
                (0, utils_1.getEvent)(data) === constants_1.WsEventMessage.Disconnected), (0, rxjs_1.take)(1))
                .subscribe((data) => {
                clearTimeout(responseTimeoutId);
                if ((0, utils_1.getEvent)(data) === constants_1.WsEventMessage.Disconnected) {
                    const error = {
                        error: {
                            message: `Disconnected`,
                        },
                    };
                    cb(error);
                }
                else {
                    cb(data);
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
            const unsubscribe = () => {
                responseSubscription.unsubscribe();
                clearTimeout(responseTimeoutId);
            };
            return unsubscribe;
        };
        this.on = (event, cb) => {
            return this.events$
                .pipe((0, rxjs_1.filter)((data) => (0, utils_1.getEvent)(data) === event))
                .subscribe((data) => cb(data));
        };
        this.send = async (message) => {
            /* eslint-disable no-async-promise-executor */
            return new Promise(async (resolve, reject) => {
                if (!this.connection) {
                    throw 'Sending message without open connection';
                }
                const modelObjectId = constants_1.NO_ID_MSG_REG_EXP.test(message.msg)
                    ? {}
                    : { id: this._getMsgId(message) };
                const data = {
                    ...message,
                    ...modelObjectId,
                };
                const stringData = JSON.stringify(data);
                try {
                    this.connection.send(stringData);
                }
                catch (error) {
                    const wsError = error;
                    console.error(`[wsClient] send() error: sending data ${wsError.message}`);
                    reject(wsError.message);
                }
                const listener = (data.msg === constants_1.WsEventMessage.Ping && constants_1.WsEventMessage.Pong) ||
                    (data.msg === constants_1.WsEventMessage.Connect &&
                        constants_1.WsEventMessage.Connected) ||
                    data.id;
                if (listener === undefined) {
                    return resolve(undefined);
                }
                this.once(listener, (result) => {
                    const sendResult = result;
                    if (sendResult && 'error' in sendResult) {
                        reject(sendResult.error.message);
                    }
                    else {
                        resolve(sendResult);
                    }
                });
            });
        };
        this.isAlive = () => {
            if (!this.lastPing) {
                return false;
            }
            return (Date.now() - this.lastPing <= this.config.ping + constants_1.RESPONSE_TIMEOUT);
        };
        this.login = async (credentials) => {
            const params = (0, utils_1.loginParams)(credentials);
            try {
                this.resume = (await this._call(constants_1.Method.Login, params));
                await this.subscribeAll();
            }
            catch (error) {
                console.error(`[wsClient] login() error: `, error);
                throw error;
            }
            this.userId = this.resume.id;
            return this.resume;
        };
        this.logout = async () => {
            this.resume = null;
            await this._unsubscribeAll();
            await this._call(constants_1.Method.Logout);
        };
        this.subscribe = async (name, params, id) => {
            try {
                const response = (await this.send({
                    msg: constants_1.WsEventMessage.Sub,
                    id,
                    name,
                    params,
                }));
                if ((0, utils_1.isSubscriptionResponse)(response)) {
                    id = response.subs[0];
                    const unsubscribe = this.unsubscribe.bind(this, id);
                    const subscription = {
                        id,
                        name,
                        params,
                        unsubscribe,
                    };
                    this.subscriptions[id] = subscription;
                    return subscription;
                }
            }
            catch (error) {
                console.error(`[wsClient] subscribe() error: `, error);
                throw error;
            }
        };
        this.subscribeAll = async () => {
            try {
                const subscriptions = Object.keys(this.subscriptions).map(async (key) => {
                    const { name, params, id } = this.subscriptions[key];
                    return this.subscribe(name, params, id);
                });
                await Promise.all(subscriptions);
            }
            catch (error) {
                console.error(`[wsClient] subscribeAll() error: `, error);
            }
        };
        this.unsubscribe = async (id) => {
            if (id in this.subscriptions) {
                delete this.subscriptions[id];
            }
            else {
                return Promise.reject(`Id: ${id} does't exist`);
            }
            try {
                const response = (await this.send({
                    msg: constants_1.WsEventMessage.Unsub,
                    id,
                }));
                return response;
            }
            catch (error) {
                console.error(`[wsClient] unsubscribe() error: `, error);
                throw error;
            }
        };
        this.subscribeNotifyAll = async () => {
            return Promise.all([
                constants_1.CommonEventNames.PermissionsChanged,
                constants_1.CommonEventNames.PublicSettingsChanged,
                constants_1.CommonEventNames.DeleteEmojiCustom,
                constants_1.CommonEventNames.RolesChange,
                constants_1.CommonEventNames.UpdateAvatar,
                constants_1.CommonEventNames.UpdateEmojiCustom,
            ].map(async (event) => this.subscribe(constants_1.Collections.StreamNotifyAll, [
                event,
                { useCollection: false, args: [false] },
            ])));
        };
        this.subscribeLoggedNotify = async () => {
            return Promise.all([
                constants_1.CommonEventNames.DeleteEmojiCustom,
                constants_1.CommonEventNames.RolesChange,
                constants_1.CommonEventNames.UpdateAvatar,
                constants_1.CommonEventNames.UpdateEmojiCustom,
                constants_1.CommonEventNames.UsersDeleted,
                constants_1.CommonEventNames.UsersNameChanged,
            ].map(async (event) => this.subscribe(constants_1.Collections.streamNotifyLogged, [
                event,
                { useCollection: false, args: [false] },
            ])));
        };
        this.subscribeNotifyUser = async () => {
            return Promise.all([
                constants_1.UserEventNames.E2EKeyRequest,
                constants_1.UserEventNames.Message,
                constants_1.UserEventNames.Notification,
                constants_1.UserEventNames.Otr,
                constants_1.UserEventNames.RoomsChanged,
                constants_1.UserEventNames.SubscriptionsChanged,
                constants_1.UserEventNames.UiInteraction,
                constants_1.UserEventNames.UserData,
                constants_1.UserEventNames.Webrtc,
                constants_1.UserEventNames.ConferenceChanged,
            ].map(async (event) => this.subscribe(constants_1.Collections.StreamNotifyUser, [
                `${this.userId}/${event}`,
                { useCollection: false, args: [false] },
            ])));
        };
        this.subscribeRoom = async (rid, ...args) => {
            return Promise.all([
                this.subscribe(constants_1.Collections.StreamRoomMessages, [
                    rid,
                    { useCollection: false, args: args },
                ]),
                this.subscribe(constants_1.Collections.StreamNotifyRoom, [
                    `${rid}/${constants_1.RoomEventNames.Typing}`,
                    { useCollection: false, args: args },
                ]),
                this.subscribe(constants_1.Collections.StreamNotifyRoom, [
                    `${rid}/${constants_1.RoomEventNames.DeleteMessage}`,
                    { useCollection: false, args: args },
                ]),
            ]);
        };
        if (!host) {
            throw '[wsClient] constructor() wrong host argument';
        }
        this.config = {
            host,
            ping,
        };
        this.userId = null;
        this.resume = null;
        this.host = (0, utils_1.getValidHost)(host);
        this.on(constants_1.WsEventMessage.Ping, async () => {
            this.lastPing = Date.now();
            try {
                await this.send({ msg: constants_1.WsEventMessage.Pong });
            }
            catch (error) {
                console.error(`[wsClient] Send pong error: `, error);
            }
        });
    }
    isConnected() {
        return !!(this.connection?.readyState === constants_1.Status.Open && this.isAlive());
    }
}
exports.WSClient = WSClient;
//# sourceMappingURL=wsClient.js.map