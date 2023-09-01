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
export type TimeData = {
    $date: number;
};
export type UserShortRecord = {
    _id: string;
    name?: string;
    username: string;
};
