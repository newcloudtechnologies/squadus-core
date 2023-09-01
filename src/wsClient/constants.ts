/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

export enum UserEventNames {
    ConferenceChanged = 'CONFERENCE_CHANGED',
    E2EKeyRequest = 'e2ekeyRequest',
    Message = 'message',
    Notification = 'notification',
    Otr = 'otr',
    RoomsChanged = 'rooms-changed',
    SubscriptionsChanged = 'subscriptions-changed',
    UiInteraction = 'uiInteraction',
    UserData = 'userData',
    Webrtc = 'webrtc',
}

export enum RoomEventNames {
    DeleteMessage = 'deleteMessage',
    Typing = 'typing',
}

export enum CommonEventNames {
    DeleteEmojiCustom = 'deleteEmojiCustom',
    PermissionsChanged = 'permissions-changed',
    PublicSettingsChanged = 'public-settings-changed',
    RolesChange = 'roles-change',
    UpdateAvatar = 'updateAvatar',
    UpdateEmojiCustom = 'updateEmojiCustom',
    UsersDeleted = 'Users:Deleted',
    UsersNameChanged = 'Users:NameChanged',
}

export enum Collections {
    StreamNotifyAll = 'stream-notify-all',
    StreamNotifyRoom = 'stream-notify-room',
    StreamNotifyUser = 'stream-notify-user',
    StreamRoomMessages = 'stream-room-messages',
    Users = 'users',
    streamNotifyLogged = 'stream-notify-logged',
}

export enum Method {
    Login = 'login',
    Logout = 'logout',
}

export enum WsEventMessage {
    Added = 'added',
    Changed = 'changed',
    Close = 'close',
    Connect = 'connect',
    Connected = 'connected',
    Disconnected = 'disconnected',
    Method = 'method',
    Nosub = 'nosub',
    Ping = 'ping',
    Pong = 'pong',
    Ready = 'ready',
    Result = 'result',
    Sub = 'sub',
    Unsub = 'unsub',
    Updated = 'updated',
}

export enum Status {
    Connecting = 0,
    Open = 1,
    Closing = 2,
    Closed = 3,
}

export const USER_DISCONNECT_CODE_CLOSE = 4000;
export const DEFAULT_PING_MS = 10000;
export const INITIAL_RECONNECT_INTERVAL = 5000;
export const MAX_WS_RECONNECT_INTERVAL = 60000;
export const RESPONSE_TIMEOUT = 5000;

export const NO_ID_MSG_REG_EXP = new RegExp(
    `${WsEventMessage.Connect}|${WsEventMessage.Ping}|${WsEventMessage.Pong}`,
);
