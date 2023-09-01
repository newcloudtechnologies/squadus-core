import { RoomType, SystemMessages } from '../../../constants';
import { Message } from '../../../models';
export type SaveRoomSettingsData = {
    message: Message;
    success: boolean;
};
export type SaveRoomSettingsRequestParams = {
    encrypted?: boolean;
    joinCode?: string;
    reactWhenReadOnly?: boolean;
    readOnly?: boolean;
    rid: string;
    roomAnnouncement?: string;
    roomDescription?: string;
    roomName?: string;
    roomTopic?: string;
    roomType?: RoomType;
    systemMessages?: Array<SystemMessages>;
};
