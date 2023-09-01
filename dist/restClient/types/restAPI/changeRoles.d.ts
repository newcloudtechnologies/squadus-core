import { RoomType } from '../../../constants';
export declare enum RoleName {
    Leader = "Leader",
    Moderator = "Moderator",
    Owner = "Owner"
}
export type RoomTypeForApi = Exclude<RoomType, RoomType.Team | RoomType.Thread>;
export type SetUserRoleRequestParams = {
    roleName: RoleName;
    roleValue: boolean;
    roomId: string;
    t: RoomTypeForApi;
    userId: string;
};
export type SetUserRoleResponse = {
    success: boolean;
};
