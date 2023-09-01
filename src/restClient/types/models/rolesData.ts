/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

export type RoleData = {
    _id: string;
    description: string;
    mandatory2fa: boolean;
    name: string;
    protected: boolean;
    scope: string;
};

export type GetRolesListResponse = {
    roles: RoleData[];
    success: boolean;
};
