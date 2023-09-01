/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import { RoomType } from '../../../constants';
import { User } from './user';

export type ChannelData = {
    _id: string;
    _updatedAt: Date;
    customFields?: RoomCustomFields;
    fname: string;
    msgs: number;
    name: string;
    ro: boolean;
    t: RoomType;
    ts: Date;
    u: User;
    usersCount: number;
};

export type CreatePrivateChannelResponse = {
    group: ChannelData;
    success: boolean;
};

export type CreatePublicChannelResponse = {
    channel: ChannelData;
    success: boolean;
};

export type RoomCustomFields = {
    // Todo fill types SMC-1733
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [name: string]: any;
};
