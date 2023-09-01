"use strict";
/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCode = exports.RestErrors = exports.Errors = void 0;
var Errors;
(function (Errors) {
    Errors["AuthorizationError"] = "rest-client-is-not-authorized";
    Errors["CantInviteForDirectRoom"] = "error-cant-invite-for-direct-room";
    Errors["ChannelNameAlreadyExists"] = "channel-already-exist-static";
    Errors["CommonError"] = "common-error";
    Errors["EmptyResult"] = "dont-have-result";
    Errors["FileToLarge"] = "error-file-too-large";
    Errors["InvalidArguments"] = "invalid-argument";
    Errors["InvalidName"] = "error-invalid-name";
    Errors["InvalidPathToAttachment"] = "invalid-path-to-attachment";
    // second factor is invalid or unset
    Errors["InvalidRequest"] = "invalid-request";
    Errors["InvalidRoom"] = "error-invalid-room";
    Errors["InvalidUser"] = "error-invalid-user";
    Errors["InvalidUsername"] = "error-invalid-username";
    Errors["LostServerConnection"] = "lost-server-connection";
    Errors["MessageSizeExceeded"] = "error-message-size-exceeded";
    Errors["NoSuchFileOrDirectory"] = "no-such-file-or-directory";
    Errors["RateLimit"] = "rate-limit";
    Errors["RoomNotFound"] = "error-room-not-found";
    Errors["TotpError"] = "rest-client-totp-error";
    Errors["UserAlreadyLeader"] = "error-user-already-leader";
    Errors["UserAlreadyModerator"] = "error-user-already-moderator";
    Errors["UserAlreadyOwner"] = "error-user-already-owner";
    Errors["UserNotInRoom"] = "error-user-not-in-room";
    Errors["UserNotLeader"] = "error-user-not-leader";
    Errors["UserNotModerator"] = "error-user-not-moderator";
    Errors["UserNotOwner"] = "error-user-not-owner";
    Errors["WrongServerAddress"] = "wrong-server-address";
    Errors["WrongServerPort"] = "wrong-server-port";
})(Errors = exports.Errors || (exports.Errors = {}));
var RestErrors;
(function (RestErrors) {
    RestErrors["BadRequest"] = "ERR_BAD_REQUEST";
    RestErrors["ChannelNameExists"] = "Channel_already_exist_static";
    RestErrors["LostConnectionErrorCode"] = "EPIPE";
    RestErrors["TotpInvalid"] = "totp-invalid";
    RestErrors["TotpRequired"] = "totp-required";
    RestErrors["WrongArguments"] = "Cannot set property 'canViewAllInfo' of undefined";
    RestErrors["WrongPort"] = "ECONNRESET";
    RestErrors["WrongProtocolLocalServer"] = "EPROTO";
    RestErrors["WrongServerAddress"] = "ENOTFOUND";
    RestErrors["WrongShortServer"] = "ECONNREFUSED";
})(RestErrors = exports.RestErrors || (exports.RestErrors = {}));
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["OK"] = 200] = "OK";
    StatusCode[StatusCode["Unauthorized"] = 401] = "Unauthorized";
})(StatusCode = exports.StatusCode || (exports.StatusCode = {}));
//# sourceMappingURL=constants.js.map