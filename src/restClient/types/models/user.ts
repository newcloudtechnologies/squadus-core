/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import { UserRoles, UserStatus } from '../../../constants';

export type User = {
    __rooms: Array<unknown>;
    _id: string;
    _updatedAt: Date;
    active: boolean;
    createdAt: Date;
    emails: Array<string>;
    name: string;
    roles: Array<UserRoles>;
    settings: object;
    status: UserStatus;
    type: UserRoles;
    username: string;
};
