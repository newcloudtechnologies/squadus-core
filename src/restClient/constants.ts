/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

export enum Errors {
    AuthorizationError = 'rest-client-is-not-authorized',
    CantInviteForDirectRoom = 'error-cant-invite-for-direct-room',
    ChannelNameAlreadyExists = 'channel-already-exist-static',
    CommonError = 'common-error',
    EmptyResult = 'dont-have-result',
    FileToLarge = 'error-file-too-large',
    InvalidArguments = 'invalid-argument',
    InvalidName = 'error-invalid-name',
    InvalidPathToAttachment = 'invalid-path-to-attachment',
    // second factor is invalid or unset
    InvalidRequest = 'invalid-request',
    InvalidRoom = 'error-invalid-room',
    InvalidUser = 'error-invalid-user',
    InvalidUsername = 'error-invalid-username',
    LostServerConnection = 'lost-server-connection',
    MessageSizeExceeded = 'error-message-size-exceeded',
    NoSuchFileOrDirectory = 'no-such-file-or-directory',
    RateLimit = 'rate-limit',
    RoomNotFound = 'error-room-not-found',
    TotpError = 'rest-client-totp-error',
    UserAlreadyLeader = 'error-user-already-leader',
    UserAlreadyModerator = 'error-user-already-moderator',
    UserAlreadyOwner = 'error-user-already-owner',
    UserNotInRoom = 'error-user-not-in-room',
    UserNotLeader = 'error-user-not-leader',
    UserNotModerator = 'error-user-not-moderator',
    UserNotOwner = 'error-user-not-owner',
    WrongServerAddress = 'wrong-server-address',
    WrongServerPort = 'wrong-server-port',
}

export enum RestErrors {
    BadRequest = 'ERR_BAD_REQUEST',
    ChannelNameExists = 'Channel_already_exist_static',
    LostConnectionErrorCode = 'EPIPE',
    TotpInvalid = 'totp-invalid',
    TotpRequired = 'totp-required',
    WrongArguments = "Cannot set property 'canViewAllInfo' of undefined",
    WrongPort = 'ECONNRESET',
    WrongProtocolLocalServer = 'EPROTO',
    WrongServerAddress = 'ENOTFOUND',
    WrongShortServer = 'ECONNREFUSED',
}

export enum StatusCode {
    OK = 200,
    Unauthorized = 401,
}
