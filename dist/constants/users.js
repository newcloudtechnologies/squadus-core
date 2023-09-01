"use strict";
/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatus = exports.UserRoles = void 0;
var UserRoles;
(function (UserRoles) {
    UserRoles["Admin"] = "admin";
    UserRoles["Guest"] = "guest";
    UserRoles["Leader"] = "leader";
    UserRoles["LivechatAgent"] = "livechat-agent";
    UserRoles["LivechatManager"] = "livechat-manager";
    UserRoles["Moderator"] = "moderator";
    UserRoles["Owner"] = "owner";
    UserRoles["RoomGuest"] = "room-guest";
    UserRoles["User"] = "user";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["Away"] = "away";
    UserStatus["Busy"] = "busy";
    UserStatus["Offline"] = "offline";
    UserStatus["Oncall"] = "oncall";
    UserStatus["Online"] = "online";
    UserStatus["Wrong"] = "wrong";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
//# sourceMappingURL=users.js.map