import { RoomType } from '../../../constants';
import { UserShortRecord } from '../../../models';
export type DiscussionData = {
    _id: string;
    _updatedAt: Date;
    default: boolean;
    encrypted: boolean;
    fname: string;
    guestAllowed: boolean;
    msgs: number;
    name: string;
    prid: string;
    ro: boolean;
    sysMes: boolean;
    t: RoomType;
    ts: Date;
    u: UserShortRecord;
    usersCount: number;
};
export type CreateDiscussionResponse = {
    discussion: DiscussionData;
    success: boolean;
};
