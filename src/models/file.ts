/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import { NewFileAttachment } from './newAttachment';
import { ShortUser } from './user';

export type File = {
    id: string;
    name: string;
    type: string;
};

export type NewRoomFile = RoomFile & NewFileAttachment;

export type RoomFile = {
    _id: string;
    description: string;
    document_preview?: string;
    document_preview_url?: string;
    name: string;
    size: number;
    squadus_preview?: boolean;
    type: string;
    uploadedAt: string;
    url: string;
    user: ShortUser;
    userId: string;
};
