/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import { LastMessage } from './message';
import { RoomType } from '../constants';

export type Room = {
    _id: string;
    _updatedAt: TimeData;
    broadcast: boolean;
    default: boolean;
    description: string;
    encrypted: boolean;
    fname: string;
    guestAllowed: boolean;
    lastMessage: LastMessage;
    lm: TimeData;
    name: string;
    ro: boolean;
    sysMes: boolean;
    t: RoomType;
    ts: TimeData;
    u: UserShortRecord;
    usersCount: number;
};

export type TimeData = { $date: number };

export type UserShortRecord = {
    _id: string;
    name?: string;
    username: string;
};
