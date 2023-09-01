"use strict";
/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NO_ID_MSG_REG_EXP = exports.RESPONSE_TIMEOUT = exports.MAX_WS_RECONNECT_INTERVAL = exports.INITIAL_RECONNECT_INTERVAL = exports.DEFAULT_PING_MS = exports.USER_DISCONNECT_CODE_CLOSE = exports.Status = exports.WsEventMessage = exports.Method = exports.Collections = exports.CommonEventNames = exports.RoomEventNames = exports.UserEventNames = void 0;
var UserEventNames;
(function (UserEventNames) {
    UserEventNames["ConferenceChanged"] = "CONFERENCE_CHANGED";
    UserEventNames["E2EKeyRequest"] = "e2ekeyRequest";
    UserEventNames["Message"] = "message";
    UserEventNames["Notification"] = "notification";
    UserEventNames["Otr"] = "otr";
    UserEventNames["RoomsChanged"] = "rooms-changed";
    UserEventNames["SubscriptionsChanged"] = "subscriptions-changed";
    UserEventNames["UiInteraction"] = "uiInteraction";
    UserEventNames["UserData"] = "userData";
    UserEventNames["Webrtc"] = "webrtc";
})(UserEventNames = exports.UserEventNames || (exports.UserEventNames = {}));
var RoomEventNames;
(function (RoomEventNames) {
    RoomEventNames["DeleteMessage"] = "deleteMessage";
    RoomEventNames["Typing"] = "typing";
})(RoomEventNames = exports.RoomEventNames || (exports.RoomEventNames = {}));
var CommonEventNames;
(function (CommonEventNames) {
    CommonEventNames["DeleteEmojiCustom"] = "deleteEmojiCustom";
    CommonEventNames["PermissionsChanged"] = "permissions-changed";
    CommonEventNames["PublicSettingsChanged"] = "public-settings-changed";
    CommonEventNames["RolesChange"] = "roles-change";
    CommonEventNames["UpdateAvatar"] = "updateAvatar";
    CommonEventNames["UpdateEmojiCustom"] = "updateEmojiCustom";
    CommonEventNames["UsersDeleted"] = "Users:Deleted";
    CommonEventNames["UsersNameChanged"] = "Users:NameChanged";
})(CommonEventNames = exports.CommonEventNames || (exports.CommonEventNames = {}));
var Collections;
(function (Collections) {
    Collections["StreamNotifyAll"] = "stream-notify-all";
    Collections["StreamNotifyRoom"] = "stream-notify-room";
    Collections["StreamNotifyUser"] = "stream-notify-user";
    Collections["StreamRoomMessages"] = "stream-room-messages";
    Collections["Users"] = "users";
    Collections["streamNotifyLogged"] = "stream-notify-logged";
})(Collections = exports.Collections || (exports.Collections = {}));
var Method;
(function (Method) {
    Method["Login"] = "login";
    Method["Logout"] = "logout";
})(Method = exports.Method || (exports.Method = {}));
var WsEventMessage;
(function (WsEventMessage) {
    WsEventMessage["Added"] = "added";
    WsEventMessage["Changed"] = "changed";
    WsEventMessage["Close"] = "close";
    WsEventMessage["Connect"] = "connect";
    WsEventMessage["Connected"] = "connected";
    WsEventMessage["Disconnected"] = "disconnected";
    WsEventMessage["Method"] = "method";
    WsEventMessage["Nosub"] = "nosub";
    WsEventMessage["Ping"] = "ping";
    WsEventMessage["Pong"] = "pong";
    WsEventMessage["Ready"] = "ready";
    WsEventMessage["Result"] = "result";
    WsEventMessage["Sub"] = "sub";
    WsEventMessage["Unsub"] = "unsub";
    WsEventMessage["Updated"] = "updated";
})(WsEventMessage = exports.WsEventMessage || (exports.WsEventMessage = {}));
var Status;
(function (Status) {
    Status[Status["Connecting"] = 0] = "Connecting";
    Status[Status["Open"] = 1] = "Open";
    Status[Status["Closing"] = 2] = "Closing";
    Status[Status["Closed"] = 3] = "Closed";
})(Status = exports.Status || (exports.Status = {}));
exports.USER_DISCONNECT_CODE_CLOSE = 4000;
exports.DEFAULT_PING_MS = 10000;
exports.INITIAL_RECONNECT_INTERVAL = 5000;
exports.MAX_WS_RECONNECT_INTERVAL = 60000;
exports.RESPONSE_TIMEOUT = 5000;
exports.NO_ID_MSG_REG_EXP = new RegExp(`${WsEventMessage.Connect}|${WsEventMessage.Ping}|${WsEventMessage.Pong}`);
//# sourceMappingURL=constants.js.map