import { RoomType } from '../../../constants';
import { ChannelData } from '../models';
export type ChannelRoomType = Extract<RoomType, RoomType.PublicChannel | RoomType.Group>;
export type RemoveUserFromChannelRequestParams = {
    rid: string;
    roomType: ChannelRoomType;
    username: string;
};
export type RemoveUserFromChannelResponse = {
    channel: ChannelData;
    success: boolean;
};
