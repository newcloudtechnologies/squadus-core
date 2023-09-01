import { Collections, WsEventMessage } from './constants';
import { Room, Message } from '../models';
/** User credentials generic interface */
export type Credentials = {
    email?: string;
    ldap?: boolean;
    ldapOptions?: object;
    password: string;
    username: string;
};
export type LoginParams = CredentialsPass | CredentialsOAuth | CredentialsAuthenticated | LoginResult | Credentials;
/** User credentials for password login method */
export type CredentialsPass = {
    password: {
        algorithm: string;
        digest: string;
    };
    user: {
        username: string;
    };
};
export type CredentialsOAuth = {
    oauth: {
        credentialSecret: string;
        credentialToken: string;
    };
};
export type CredentialsAuthenticated = {
    resume: string;
};
export type LoginResult = {
    id: string;
    token: string;
    tokenExpires: {
        $date: number;
    };
    type: string;
};
export type SubscriptionData = RoomsChangedEvent | CommonSubscriptionData | RoomEvent;
export type WsData = PongData | ServerData | ConnectedData | AuthorizedData | CallResponseData | SubscriptionResponseData | SubscriptionData | UnsubscribeResponseData | ResponseError;
export type ResponseError = {
    error: {
        error?: number;
        errorType?: string;
        isClientSafe?: true;
        message: string;
        reason?: string;
    };
    id?: string;
    msg?: string;
};
export type PongData = {
    msg: WsEventMessage.Pong;
};
export type ServerData = {
    server_id: string;
};
export type ConnectedData = {
    msg: WsEventMessage.Connected;
    session: string;
};
export type AuthorizedData = {
    collection: Collections.Users;
    fields: {
        emails: {
            address: string;
            verified: boolean;
        }[];
        username: string;
    };
    id: string;
    msg: WsEventMessage.Added;
};
export type CallResponseData = {
    id: string;
    msg: WsEventMessage.Result;
    result?: {
        [key: string]: unknown;
    };
};
export type SendResponse = CallResponseData | SubscriptionResponseData | UnsubscribeResponseData | undefined;
export type SubscriptionResponseData = {
    msg: WsEventMessage.Ready;
    subs: string[];
};
export type SendParams = {
    id?: string;
    method?: string;
    msg: WsEventMessage;
    name?: string;
    params?: unknown;
    support?: string[];
    version?: string;
};
export type UnsubscribeResponseData = {
    id: string;
    msg: WsEventMessage.Nosub;
};
export type CommonSubscriptionData = {
    collection: Collections;
    fields: {
        args: unknown[];
        eventName: string;
    };
    id: string;
    msg: WsEventMessage.Changed;
};
export type SocketMessageCallback = {
    (data: WsData): void;
};
export type WsSubscription = {
    id: string;
    name: string;
    params: unknown[];
    unsubscribe: () => Promise<UnsubscribeResponseData>;
};
export type RoomsChangedEvent = {
    collection: Collections.StreamNotifyUser;
    fields: {
        args: [string, Room];
        eventName: string;
    };
    id: string;
    msg: WsEventMessage.Changed;
};
export type RoomEvent = RoomMessageEvent | RoomTypingEvent;
export type RoomMessageEvent = {
    collection: Collections.StreamRoomMessages;
    fields: {
        args: [Message];
        eventName: string;
    };
    id: 'id';
    msg: WsEventMessage.Changed;
};
export type RoomTypingEvent = {
    collection: Collections.StreamNotifyRoom;
    fields: {
        args: [string, boolean];
        eventName: string;
    };
    id: 'id';
    msg: WsEventMessage.Changed;
};
