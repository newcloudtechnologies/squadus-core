/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

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
