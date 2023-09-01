import { TimeData } from './room';
import { Attachment, UnnormalizedReplyAttachment } from './attachment';
import { Reaction } from './reaction';
import { Url } from './url';
import { NewRoomFile } from './file';
import { NewMessageFileAttachment } from './newAttachment';
export declare enum E2EType {
    Done = "done",
    Pending = "pending"
}
export type EditedBy = {
    _id: string;
    username: string;
};
export type LastMessage = {
    _id: string;
    _updatedAt: Date;
    attachments: (Attachment | NewRoomFile | NewMessageFileAttachment | UnnormalizedReplyAttachment)[];
    channels: UserChannel[];
    e2e: E2EType;
    file?: MessageFile;
    md: MarkdownAST;
    mentions: UserMention[];
    msg: string;
    reactions?: Reaction[];
    rid: string;
    status: boolean;
    t: MessageType;
    tmid: string;
    ts: Date;
    tshow: boolean;
    u: UserMessage;
    unread: boolean;
    urls: string[];
};
export type MarkdownAST = any;
export type Message = {
    _id: string;
    _updatedAt: TimeData;
    alias?: string;
    attachments?: (Attachment | NewRoomFile | NewMessageFileAttachment | UnnormalizedReplyAttachment)[];
    autoTranslate?: boolean;
    avatar?: string;
    blocks?: any;
    channels?: UserChannel[];
    dcount?: number;
    dlm?: Date;
    drid?: string;
    e2e?: string;
    editedBy?: EditedBy;
    emoji?: string;
    file?: MessageFile;
    groupable?: boolean;
    id?: string;
    md?: MarkdownAST;
    mentions?: UserMention[];
    msg: string;
    parseUrls?: boolean;
    pinned?: boolean;
    reactions?: Reaction;
    replies?: string[];
    rid: string;
    role?: string;
    starred?: boolean;
    status?: number;
    subscription?: {
        id: string;
    };
    t?: MessageType;
    tcount?: number;
    tlm?: Date;
    tmid?: string;
    tmsg?: string;
    translations?: Translations[];
    ts: TimeData;
    tshow?: boolean;
    u: UserMessage;
    unread?: boolean;
    urls?: Url[];
};
export type MessageFile = {
    _id: string;
    name: string;
    type: string;
};
export declare enum MessageType {
    DiscussionCreated = "discussion-created",
    Encrypted = "e2e",
    ForwardMessage = "forward-message",
    JitsiCallStarted = "jitsi_call_started",
    JitsiCallThread = "jitsi_call_thread",
    LoadMore = "load_more",
    Removed = "rm",
    UserJoined = "uj"
}
export type Translations = {
    _id: string;
    language: string;
    value: string;
};
export type UserChannel = {
    [index: number]: string | number;
    _id: string;
    name: string;
};
export type UserMention = UserMessage & {
    type: string;
};
export type UserMessage = {
    _id: string;
    name?: string;
    username?: string;
};
