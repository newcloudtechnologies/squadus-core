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
    [name: string]: any;
};
