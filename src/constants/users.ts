/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

export enum UserRoles {
    Admin = 'admin',
    Guest = 'guest',
    Leader = 'leader',
    LivechatAgent = 'livechat-agent',
    LivechatManager = 'livechat-manager',
    Moderator = 'moderator',
    Owner = 'owner',
    RoomGuest = 'room-guest',
    User = 'user',
}

export enum UserStatus {
    Away = 'away',
    Busy = 'busy',
    Offline = 'offline',
    Oncall = 'oncall',
    Online = 'online',
    Wrong = 'wrong',
}
