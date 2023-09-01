/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import { CommonTypeGroup } from '../constants/attachment';
import { Attachment, AttachmentActions } from './attachment';

export type ImageDimensions = {
    height: number;
    width: number;
};

export type NewAudioAttachment = NewFileAttachmentBase & {
    typeGroup: CommonTypeGroup.Audio;
};

export type NewDocumentAttachment = NewFileAttachmentBase & {
    document_preview: string; // preview url for mobile clients. Remove in SMC-2140
    typeGroup: CommonTypeGroup.Application | CommonTypeGroup.Text;
};

export type NewFileAttachment =
    | NewImageAttachment
    | NewVideoAttachment
    | NewAudioAttachment
    | NewDocumentAttachment;

export type NewFileAttachmentBase = {
    _id: string;
    // file downloadLink
    actions?: AttachmentActions;
    // file full mime type message->file->type
    description: string;
    // file description
    documentPreviewUrl?: string;
    // image thumbnail url
    downloadLink: string;
    // file preview url
    imageThumbnailUrl?: string;
    // file id
    name: string;
    // file name message->attachment->title or message->file->name
    size: number;
    text?: string;
    // file byte size message->attachment->size_bytes
    type: string;
};

export type NewImageAttachment = NewFileAttachmentBase &
    NewImageAttachmentProps;

export type NewImageAttachmentProps = {
    imageDimensions?: ImageDimensions;
    imagePreview?: string;
    typeGroup: CommonTypeGroup.Image; // very small image placeholder(base64)
};

export type NewMessageFileAttachment = Attachment & {
    file: NewFileAttachment;
};

export type NewVideoAttachment = NewFileAttachmentBase & {
    typeGroup: CommonTypeGroup.Video;
};

export type TypeGroup = CommonTypeGroup | string;
