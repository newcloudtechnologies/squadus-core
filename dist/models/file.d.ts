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
