/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import { UserRoles, UserStatus } from '../constants';

export type CurrentUser = ShortUser &
    UserWithRoles & {
        avatarETag: string;
        customFields?: {
            [name: string]: unknown;
        };
        emails?: {
            address: string;
            verified: boolean;
        }[];
        language?: string;
        loginEmailPassword?: string;
        showMessageInMainThread: boolean;
        status: UserStatus;
        statusLivechat: string;
        statusText: string | null;
    };

export type ShortUser = {
    id: string;
    name: string;
    username: string;
};

export { UserRoles, UserStatus };

export type UserWithRoles = ShortUser & {
    roles: UserRoles[];
    token: string;
};
