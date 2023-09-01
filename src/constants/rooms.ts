/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

export enum RoomEvent {
    Delete = 'delete',
    Leave = 'leave',
}

export enum RoomStatus {
    Created = 'created',
}

export enum RoomType {
    Direct = 'd',
    Discussion = 'discussion',
    Group = 'p',
    OmniChannel = 'l',
    PublicChannel = 'c',
    Team = 't',
    /*
        The "thread" and "discussion" types aren't exactly fair data types. 
        We do not receive them from the server and write them manually. An honest
        definition of a "thread" occurs according on "tmid", "discussions" on "prid".

        This is also true for enum RoomTypeFull.

        TODO: looks like we need to get away from using manually written types after
        stories SMC-2074, SMC-4543
    */
    Thread = 'thread',
}

export enum RoomTypeFull {
    Direct = 'direct',
    Discussion = 'discussion',
    Group = 'group',
    OmniChannel = 'omnichannel',
    PublicChannel = 'channel',
    Team = 'team',
    Thread = 'thread',
}

export enum RoomTypeToAPIType {
    c = 'channels',
    d = 'im',
    discussion = 'rooms',
    l = 'channels',
    p = 'groups',
}

export enum RoomUserRoles {
    Guest = 'guest',
    Leader = 'leader',
    Moderator = 'moderator',
    Owner = 'owner',
    RoomGuest = 'room-guest',
}

// values of enum are written with small letters for correct work with them in places of use
export enum RoomUserRolesPriority {
    guest,
    'room-guest',
    owner,
    moderator,
    leader,
}

export enum RoomUserRolesUppercase {
    Guest = 'GUEST',
    Leader = 'LEADER',
    Moderator = 'MODERATOR',
    Owner = 'OWNER',
    RoomGuest = 'ROOM-GUEST',
}

export enum SortRoomsBy {
    Activity = 'activity',
    Alphabetical = 'alphabetical',
}
