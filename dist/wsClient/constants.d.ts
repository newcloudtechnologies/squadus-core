export declare enum UserEventNames {
    ConferenceChanged = "CONFERENCE_CHANGED",
    E2EKeyRequest = "e2ekeyRequest",
    Message = "message",
    Notification = "notification",
    Otr = "otr",
    RoomsChanged = "rooms-changed",
    SubscriptionsChanged = "subscriptions-changed",
    UiInteraction = "uiInteraction",
    UserData = "userData",
    Webrtc = "webrtc"
}
export declare enum RoomEventNames {
    DeleteMessage = "deleteMessage",
    Typing = "typing"
}
export declare enum CommonEventNames {
    DeleteEmojiCustom = "deleteEmojiCustom",
    PermissionsChanged = "permissions-changed",
    PublicSettingsChanged = "public-settings-changed",
    RolesChange = "roles-change",
    UpdateAvatar = "updateAvatar",
    UpdateEmojiCustom = "updateEmojiCustom",
    UsersDeleted = "Users:Deleted",
    UsersNameChanged = "Users:NameChanged"
}
export declare enum Collections {
    StreamNotifyAll = "stream-notify-all",
    StreamNotifyRoom = "stream-notify-room",
    StreamNotifyUser = "stream-notify-user",
    StreamRoomMessages = "stream-room-messages",
    Users = "users",
    streamNotifyLogged = "stream-notify-logged"
}
export declare enum Method {
    Login = "login",
    Logout = "logout"
}
export declare enum WsEventMessage {
    Added = "added",
    Changed = "changed",
    Close = "close",
    Connect = "connect",
    Connected = "connected",
    Disconnected = "disconnected",
    Method = "method",
    Nosub = "nosub",
    Ping = "ping",
    Pong = "pong",
    Ready = "ready",
    Result = "result",
    Sub = "sub",
    Unsub = "unsub",
    Updated = "updated"
}
export declare enum Status {
    Connecting = 0,
    Open = 1,
    Closing = 2,
    Closed = 3
}
export declare const USER_DISCONNECT_CODE_CLOSE = 4000;
export declare const DEFAULT_PING_MS = 10000;
export declare const INITIAL_RECONNECT_INTERVAL = 5000;
export declare const MAX_WS_RECONNECT_INTERVAL = 60000;
export declare const RESPONSE_TIMEOUT = 5000;
export declare const NO_ID_MSG_REG_EXP: RegExp;
