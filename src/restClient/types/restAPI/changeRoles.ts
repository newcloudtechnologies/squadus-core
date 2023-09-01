/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import { RoomType } from '../../../constants';

export enum RoleName {
    Leader = 'Leader',
    Moderator = 'Moderator',
    Owner = 'Owner',
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
