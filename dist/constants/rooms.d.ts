export declare enum RoomEvent {
    Delete = "delete",
    Leave = "leave"
}
export declare enum RoomStatus {
    Created = "created"
}
export declare enum RoomType {
    Direct = "d",
    Discussion = "discussion",
    Group = "p",
    OmniChannel = "l",
    PublicChannel = "c",
    Team = "t",
    Thread = "thread"
}
export declare enum RoomTypeFull {
    Direct = "direct",
    Discussion = "discussion",
    Group = "group",
    OmniChannel = "omnichannel",
    PublicChannel = "channel",
    Team = "team",
    Thread = "thread"
}
export declare enum RoomTypeToAPIType {
    c = "channels",
    d = "im",
    discussion = "rooms",
    l = "channels",
    p = "groups"
}
export declare enum RoomUserRoles {
    Guest = "guest",
    Leader = "leader",
    Moderator = "moderator",
    Owner = "owner",
    RoomGuest = "room-guest"
}
export declare enum RoomUserRolesPriority {
    guest = 0,
    'room-guest' = 1,
    owner = 2,
    moderator = 3,
    leader = 4
}
export declare enum RoomUserRolesUppercase {
    Guest = "GUEST",
    Leader = "LEADER",
    Moderator = "MODERATOR",
    Owner = "OWNER",
    RoomGuest = "ROOM-GUEST"
}
export declare enum SortRoomsBy {
    Activity = "activity",
    Alphabetical = "alphabetical"
}
