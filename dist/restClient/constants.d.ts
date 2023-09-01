export declare enum Errors {
    AuthorizationError = "rest-client-is-not-authorized",
    CantInviteForDirectRoom = "error-cant-invite-for-direct-room",
    ChannelNameAlreadyExists = "channel-already-exist-static",
    CommonError = "common-error",
    EmptyResult = "dont-have-result",
    FileToLarge = "error-file-too-large",
    InvalidArguments = "invalid-argument",
    InvalidName = "error-invalid-name",
    InvalidPathToAttachment = "invalid-path-to-attachment",
    InvalidRequest = "invalid-request",
    InvalidRoom = "error-invalid-room",
    InvalidUser = "error-invalid-user",
    InvalidUsername = "error-invalid-username",
    LostServerConnection = "lost-server-connection",
    MessageSizeExceeded = "error-message-size-exceeded",
    NoSuchFileOrDirectory = "no-such-file-or-directory",
    RateLimit = "rate-limit",
    RoomNotFound = "error-room-not-found",
    TotpError = "rest-client-totp-error",
    UserAlreadyLeader = "error-user-already-leader",
    UserAlreadyModerator = "error-user-already-moderator",
    UserAlreadyOwner = "error-user-already-owner",
    UserNotInRoom = "error-user-not-in-room",
    UserNotLeader = "error-user-not-leader",
    UserNotModerator = "error-user-not-moderator",
    UserNotOwner = "error-user-not-owner",
    WrongServerAddress = "wrong-server-address",
    WrongServerPort = "wrong-server-port"
}
export declare enum RestErrors {
    BadRequest = "ERR_BAD_REQUEST",
    ChannelNameExists = "Channel_already_exist_static",
    LostConnectionErrorCode = "EPIPE",
    TotpInvalid = "totp-invalid",
    TotpRequired = "totp-required",
    WrongArguments = "Cannot set property 'canViewAllInfo' of undefined",
    WrongPort = "ECONNRESET",
    WrongProtocolLocalServer = "EPROTO",
    WrongServerAddress = "ENOTFOUND",
    WrongShortServer = "ECONNREFUSED"
}
export declare enum StatusCode {
    OK = 200,
    Unauthorized = 401
}
