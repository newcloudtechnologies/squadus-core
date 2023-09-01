import { ChannelData, GroupData } from '../models';
export type GetRoomInfoByRoomIdRequestParams = {
    rid: string;
    roomName?: string;
};
export type GetRoomInfoByRoomNameRequestParams = {
    rid?: string;
    roomName: string;
};
export type GetRoomInfoRequestParams = GetRoomInfoByRoomIdRequestParams | GetRoomInfoByRoomNameRequestParams;
export type GetRoomInfoResponse = {
    room: GroupData | ChannelData;
    success: boolean;
};
