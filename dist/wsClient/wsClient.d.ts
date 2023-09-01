import WebSocket from 'universal-ws-client';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Status } from './constants';
import { LoginResult, WsSubscription, LoginParams, WsData, SendParams, SendResponse, UnsubscribeResponseData, ResponseError } from './types';
export declare class WSClient {
    events$: Subject<WsData>;
    status$: BehaviorSubject<Status>;
    host: string;
    pingTimeout?: ReturnType<typeof setTimeout> | number;
    openTimeout?: ReturnType<typeof setTimeout> | number;
    config: {
        host: string;
        ping: number;
    };
    connection?: WebSocket;
    lastPing: number;
    subscriptions: {
        [id: string]: WsSubscription;
    };
    userId: string | null;
    resume: LoginResult | null;
    counter: number;
    reopenCounter: number;
    constructor(host: string, ping?: number);
    private _onOpen;
    private _onClose;
    private _ping;
    private _call;
    private _getMsgId;
    private _unsubscribeAll;
    open: () => Promise<void>;
    isConnected(): boolean;
    onMessage: (event: WebSocket.MessageEvent) => void;
    close: () => Promise<void>;
    reopen: () => Promise<void>;
    once: (listener: string, cb: (data: WsData | ResponseError) => void, timeout?: number) => (() => void);
    on: (event: string, cb: (data: WsData) => void) => Subscription;
    send: (message: SendParams) => Promise<SendResponse | undefined>;
    isAlive: () => boolean;
    login: (credentials: LoginParams) => Promise<LoginResult>;
    logout: () => Promise<void>;
    subscribe: (name: string, params: unknown[], id?: string) => Promise<WsSubscription | undefined>;
    subscribeAll: () => Promise<void>;
    unsubscribe: (id: string) => Promise<UnsubscribeResponseData>;
    subscribeNotifyAll: () => Promise<(WsSubscription | undefined)[]>;
    subscribeLoggedNotify: () => Promise<(WsSubscription | undefined)[]>;
    subscribeNotifyUser: () => Promise<(WsSubscription | undefined)[]>;
    subscribeRoom: (rid: string, ...args: unknown[]) => Promise<(WsSubscription | undefined)[]>;
}
