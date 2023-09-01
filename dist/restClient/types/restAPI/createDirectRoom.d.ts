import { RoomType } from '../../../constants/rooms';
export type DirectRoomData = {
    _id: string;
    rid: string;
    t: RoomType;
    usernames: Array<string>;
};
export type DirectRoomResponse = {
    room: DirectRoomData;
    success: boolean;
};
