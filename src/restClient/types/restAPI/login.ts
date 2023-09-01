/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

type LoginViaTokenProps = {
    password?: never;
    token: string;
    userName?: never;
};

type LoginViaCredentialsProps = {
    password: string;
    token?: never;
    userName: string;
};

export type LoginRequestParams = LoginViaTokenProps | LoginViaCredentialsProps;
