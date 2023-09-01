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
    document_preview: string;
    typeGroup: CommonTypeGroup.Application | CommonTypeGroup.Text;
};
export type NewFileAttachment = NewImageAttachment | NewVideoAttachment | NewAudioAttachment | NewDocumentAttachment;
export type NewFileAttachmentBase = {
    _id: string;
    actions?: AttachmentActions;
    description: string;
    documentPreviewUrl?: string;
    downloadLink: string;
    imageThumbnailUrl?: string;
    name: string;
    size: number;
    text?: string;
    type: string;
};
export type NewImageAttachment = NewFileAttachmentBase & NewImageAttachmentProps;
export type NewImageAttachmentProps = {
    imageDimensions?: ImageDimensions;
    imagePreview?: string;
    typeGroup: CommonTypeGroup.Image;
};
export type NewMessageFileAttachment = Attachment & {
    file: NewFileAttachment;
};
export type NewVideoAttachment = NewFileAttachmentBase & {
    typeGroup: CommonTypeGroup.Video;
};
export type TypeGroup = CommonTypeGroup | string;
