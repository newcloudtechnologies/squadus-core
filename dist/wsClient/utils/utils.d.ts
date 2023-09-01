import { CredentialsPass, CredentialsOAuth, CredentialsAuthenticated, LoginResult, LoginParams, SubscriptionData, AuthorizedData, PongData, CallResponseData, SubscriptionResponseData, UnsubscribeResponseData, ServerData, WsData, RoomsChangedEvent } from '../types';
export declare const loginParams: (credentials: LoginParams) => CredentialsPass | CredentialsOAuth | CredentialsAuthenticated;
/** Password login credential type guard */
export declare function isLoginPass(params: LoginParams): params is CredentialsPass;
/** Password login credential type guard */
export declare function isLoginOAuth(params: LoginParams): params is CredentialsOAuth;
/** Password login credential type guard */
export declare function isLoginAuthenticated(params: LoginParams): params is CredentialsAuthenticated;
/** Password login credential type guard */
export declare function isLoginResult(params: LoginParams): params is LoginResult;
export declare function getReopenInterval(counter: number): number;
export declare const getValidHost: (host: string) => string;
export declare const hostToWS: (host: string) => string;
export declare function isSubscriptionData(data: WsData): data is SubscriptionData;
export declare function isAuthorizedData(data: WsData): data is AuthorizedData;
export declare function isPongData(data: WsData): data is PongData;
export declare function isCallResponse(data: WsData): data is CallResponseData;
export declare function isSubscriptionResponse(data: WsData): data is SubscriptionResponseData;
export declare function isUnsubscribeResponse(data: WsData): data is UnsubscribeResponseData;
export declare function isServerData(data: WsData): data is ServerData;
export declare function getEvent(data: WsData): string | undefined;
export declare function isRoomsChangedEvent(data: WsData): data is RoomsChangedEvent;
