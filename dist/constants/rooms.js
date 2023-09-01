"use strict";
/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortRoomsBy = exports.RoomUserRolesUppercase = exports.RoomUserRolesPriority = exports.RoomUserRoles = exports.RoomTypeToAPIType = exports.RoomTypeFull = exports.RoomType = exports.RoomStatus = exports.RoomEvent = void 0;
var RoomEvent;
(function (RoomEvent) {
    RoomEvent["Delete"] = "delete";
    RoomEvent["Leave"] = "leave";
})(RoomEvent = exports.RoomEvent || (exports.RoomEvent = {}));
var RoomStatus;
(function (RoomStatus) {
    RoomStatus["Created"] = "created";
})(RoomStatus = exports.RoomStatus || (exports.RoomStatus = {}));
var RoomType;
(function (RoomType) {
    RoomType["Direct"] = "d";
    RoomType["Discussion"] = "discussion";
    RoomType["Group"] = "p";
    RoomType["OmniChannel"] = "l";
    RoomType["PublicChannel"] = "c";
    RoomType["Team"] = "t";
    /*
        The "thread" and "discussion" types aren't exactly fair data types.
        We do not receive them from the server and write them manually. An honest
        definition of a "thread" occurs according on "tmid", "discussions" on "prid".

        This is also true for enum RoomTypeFull.

        TODO: looks like we need to get away from using manually written types after
        stories SMC-2074, SMC-4543
    */
    RoomType["Thread"] = "thread";
})(RoomType = exports.RoomType || (exports.RoomType = {}));
var RoomTypeFull;
(function (RoomTypeFull) {
    RoomTypeFull["Direct"] = "direct";
    RoomTypeFull["Discussion"] = "discussion";
    RoomTypeFull["Group"] = "group";
    RoomTypeFull["OmniChannel"] = "omnichannel";
    RoomTypeFull["PublicChannel"] = "channel";
    RoomTypeFull["Team"] = "team";
    RoomTypeFull["Thread"] = "thread";
})(RoomTypeFull = exports.RoomTypeFull || (exports.RoomTypeFull = {}));
var RoomTypeToAPIType;
(function (RoomTypeToAPIType) {
    RoomTypeToAPIType["c"] = "channels";
    RoomTypeToAPIType["d"] = "im";
    RoomTypeToAPIType["discussion"] = "rooms";
    RoomTypeToAPIType["l"] = "channels";
    RoomTypeToAPIType["p"] = "groups";
})(RoomTypeToAPIType = exports.RoomTypeToAPIType || (exports.RoomTypeToAPIType = {}));
var RoomUserRoles;
(function (RoomUserRoles) {
    RoomUserRoles["Guest"] = "guest";
    RoomUserRoles["Leader"] = "leader";
    RoomUserRoles["Moderator"] = "moderator";
    RoomUserRoles["Owner"] = "owner";
    RoomUserRoles["RoomGuest"] = "room-guest";
})(RoomUserRoles = exports.RoomUserRoles || (exports.RoomUserRoles = {}));
// values of enum are written with small letters for correct work with them in places of use
var RoomUserRolesPriority;
(function (RoomUserRolesPriority) {
    RoomUserRolesPriority[RoomUserRolesPriority["guest"] = 0] = "guest";
    RoomUserRolesPriority[RoomUserRolesPriority["room-guest"] = 1] = "room-guest";
    RoomUserRolesPriority[RoomUserRolesPriority["owner"] = 2] = "owner";
    RoomUserRolesPriority[RoomUserRolesPriority["moderator"] = 3] = "moderator";
    RoomUserRolesPriority[RoomUserRolesPriority["leader"] = 4] = "leader";
})(RoomUserRolesPriority = exports.RoomUserRolesPriority || (exports.RoomUserRolesPriority = {}));
var RoomUserRolesUppercase;
(function (RoomUserRolesUppercase) {
    RoomUserRolesUppercase["Guest"] = "GUEST";
    RoomUserRolesUppercase["Leader"] = "LEADER";
    RoomUserRolesUppercase["Moderator"] = "MODERATOR";
    RoomUserRolesUppercase["Owner"] = "OWNER";
    RoomUserRolesUppercase["RoomGuest"] = "ROOM-GUEST";
})(RoomUserRolesUppercase = exports.RoomUserRolesUppercase || (exports.RoomUserRolesUppercase = {}));
var SortRoomsBy;
(function (SortRoomsBy) {
    SortRoomsBy["Activity"] = "activity";
    SortRoomsBy["Alphabetical"] = "alphabetical";
})(SortRoomsBy = exports.SortRoomsBy || (exports.SortRoomsBy = {}));
//# sourceMappingURL=rooms.js.map