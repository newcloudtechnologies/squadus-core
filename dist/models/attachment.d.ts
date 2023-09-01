import { NewRoomFile } from './file';
import { Message } from './message';
import { NewFileAttachment, NewMessageFileAttachment } from './newAttachment';
export type Attachment = VideoAttachment | DocumentAttachment | ImageAttachment | AudioAttachment;
export type AttachmentActions = {
    msg: string;
    text: string;
    type: string;
}[];
export type AudioAttachment = BaseAttachment & {
    audio_size?: number;
    audio_type?: string;
    audio_url: string;
};
export type BaseAttachment = {
    actions?: AttachmentActions;
    attachments?: Attachment[];
    author_icon?: string;
    author_link?: string;
    author_name?: string;
    color?: string;
    description: string;
    document_preview_url?: string;
    fields?: Attachment[];
    isFile?: boolean;
    message_link?: string;
    mime?: string;
    path?: string;
    short?: boolean;
    size: number | string;
    size_bytes?: number;
    squadus_preview?: boolean;
    text?: string;
    thumb_url?: string;
    title: string;
    title_link?: string;
    title_link_download?: boolean;
    ts?: Date;
    type: string;
    value?: string;
};
export type DocumentAttachment = BaseAttachment & {
    document_preview: string;
};
export type ImageAttachment = BaseAttachment & {
    image_dimensions?: {
        height?: number;
        width?: number;
    };
    image_preview?: string;
    image_size?: number;
    image_thumbnail_url?: string;
    image_type?: string;
    image_url: string;
};
export type ReplyAttachment = ReplyAttachmentBase & {
    attachments: (NewFileAttachment | ReplyAttachment)[];
};
type ReplyAttachmentBase = {
    author_icon: string;
    author_link?: string;
    author_name: string;
    description?: string;
    fields: Attachment[];
    forwardMessages?: Message[];
    message_link?: string;
    size?: string;
    text: string;
    thumb_url?: string;
    title?: string;
    title_link?: string;
    ts?: Date;
    type?: string;
};
export type UnnormalizedReplyAttachment = ReplyAttachmentBase & {
    attachments: (Attachment | NewRoomFile | NewMessageFileAttachment | UnnormalizedReplyAttachment)[];
};
export type VideoAttachment = BaseAttachment & {
    video_size?: number;
    video_type?: string;
    video_url: string;
};
export {};
