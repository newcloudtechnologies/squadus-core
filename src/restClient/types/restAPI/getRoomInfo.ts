/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import { ChannelData, GroupData } from '../models';

export type GetRoomInfoByRoomIdRequestParams = {
    rid: string;
    roomName?: string;
};

export type GetRoomInfoByRoomNameRequestParams = {
    rid?: string;
    roomName: string;
};

export type GetRoomInfoRequestParams =
    | GetRoomInfoByRoomIdRequestParams
    | GetRoomInfoByRoomNameRequestParams;

export type GetRoomInfoResponse = {
    room: GroupData | ChannelData;
    success: boolean;
};
